import { Connection } from 'mysql2/promise';
import { Client } from 'pg';
import { DataSource } from 'typeorm';
import { QueryOption } from '../types/query-option';
import { RelationN2NResult } from '../types/relation-n2n-result';
import { TransactionQueries } from '../types/transaction-queries';
import { Database } from './database';
import EventEmitter = require('events');

export class AbstractDatabase {
  private client: Client | Connection | null = null;
  private foreignKeys: any = {};
  private foreignKeysByTable: any = {};
  private primaryKeys: any = {};
  private columnNameFromRelation: any = {};
  private relationN2N: any = {};
  private relation1N: any = {};
  private columnComment: any = {};
  private tableHasColumnOrder: any = {};
  private eventEmitter = new EventEmitter();
  private autoClose = true;

  constructor(
    protected type: Database,
    protected host: string,
    protected user: string,
    protected password: string,
    protected database: string,
    protected port: number,
  ) {}

  getDataSource() {
    return new DataSource({
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.user,
      password: this.password,
      database: this.database,
      synchronize: true,
      logging: false,
      entities: [],
      subscribers: [],
      migrations: [],
    });
  }

  disableAutoClose() {
    this.autoClose = false;
  }

  close() {
    return this.client?.end();
  }

  on(event: string, listener: (...args: any[]) => void) {
    return this.eventEmitter.on(event, listener);
  }

  getArrayType(values: any[]) {
    return [...new Set(values.map((value) => typeof value))][0];
  }

  getWhereWithIn(
    columnName: string,
    operator: 'in' | 'nin',
    values: string[] | number[],
  ) {
    switch (this.type) {
      case Database.POSTGRES:
        if (operator === 'in') {
          return `${this.getColumnNameWithScaping(columnName)} = ANY(?::${this.getArrayType(values) === 'number' ? 'int' : 'text'}[])`;
        } else {
          return `${this.getColumnNameWithScaping(columnName)} <> ALL(?::${this.getArrayType(values) === 'number' ? 'int' : 'text'}[])`;
        }
      case Database.MYSQL:
        return `${this.getColumnNameWithScaping(columnName)} ${operator === 'in' ? 'IN' : 'NOT IN'}(${values.map((value) => AbstractDatabase.addSimpleQuotes(value)).join(', ')})`;
    }
  }

  static addSimpleQuotes(value: any): string {
    if (typeof value === 'string') {
      return `'${value}'`;
    }

    return value;
  }

  private replacePlaceholders(query: string): string {
    let index = 1;
    return query.replace(/\?/g, () => {
      return `$${index++}`;
    });
  }

  getColumnNameWithScaping(columnName: string) {
    switch (this.type) {
      case Database.POSTGRES:
        return `"${columnName}"`;

      case Database.MYSQL:
        return `\`${columnName}\``;
    }
  }

  getLimit(offset: number, limit: number) {
    switch (this.type) {
      case Database.POSTGRES:
        return `LIMIT ${offset} OFFSET ${limit}`;

      case Database.MYSQL:
        return `LIMIT ${offset}, ${limit}`;
    }
  }

  getTableNameFromQuery(query: string): string | null {
    const match = query.match(/INSERT INTO\s+([`"]?[\w-]+[`"]?)/i);
    if (match && match[1]) {
      return match[1].replace(/[`"]/g, '');
    }

    return null;
  }

  async hasTableColumnOrder(tableName: string) {
    if (this.tableHasColumnOrder[tableName]) {
      return this.tableHasColumnOrder[tableName];
    }

    return (this.tableHasColumnOrder[tableName] =
      (await this.getColumnComment(tableName, 'order')) === 'order');
  }

  async getColumnComment(tableName: string, columnName: string) {
    if (this.columnComment[`${tableName}.${columnName}`]) {
      return this.columnComment[`${tableName}.${columnName}`];
    }

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT a.attname AS column_name,
                col_description(a.attrelid, a.attnum) AS column_comment
          FROM pg_class AS c
          JOIN pg_attribute AS a ON a.attrelid = c.oid
          WHERE c.relname = ?
            AND a.attname = ?;`,
          [tableName, columnName],
        );

        return resultPg.length > 0
          ? (this.columnComment[`${tableName}.${columnName}`] =
              resultPg[0].column_comment)
          : '';

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT COLUMN_NAME, COLUMN_COMMENT
          FROM information_schema.COLUMNS
          WHERE TABLE_NAME = ?
            AND COLUMN_NAME = ?;`,
          [tableName, columnName],
        );

        return resultMysql.length > 0
          ? (this.columnComment[`${tableName}.${columnName}`] =
              resultMysql[0].COLUMN_COMMENT)
          : '';
    }
  }

  async getTableNameFromForeignKey(
    tableName: string,
    foreignKey: string,
  ): Promise<string> {
    if (this.foreignKeys[`${tableName}.${foreignKey}`]) {
      return this.foreignKeys[`${tableName}.${foreignKey}`];
    }

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT
            ccu.table_name
          FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
          WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = ? AND kcu.column_name = ?;`,
          [tableName, foreignKey],
        );

        if (resultPg.length === 0) {
          throw new Error(
            `Foreign key ${tableName}.${foreignKey} not found in database.`,
          );
        }

        return (this.foreignKeys[`${tableName}.${foreignKey}`] =
          resultPg[0].table_name);

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT kcu.REFERENCED_TABLE_NAME as table_name
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
            JOIN information_schema.table_constraints AS tc
            ON tc.constraint_name = kcu.constraint_name
                          AND tc.table_schema = kcu.table_schema
            WHERE kcu.TABLE_NAME = ? AND kcu.COLUMN_NAME = ? AND tc.CONSTRAINT_TYPE = 'FOREIGN KEY'`,
          [tableName, foreignKey],
        );

        if (resultMysql.length === 0) {
          throw new Error(
            `Foreign key ${tableName}.${foreignKey} not found in database.`,
          );
        }

        return (this.foreignKeys[`${tableName}.${foreignKey}`] =
          resultMysql[0].table_name);
    }
  }

  private shouldHandleReturning(options?: QueryOption): boolean {
    return options?.returning !== undefined;
  }

  private isReturningSingleField(options?: QueryOption): boolean {
    return (
      options?.returning instanceof Array && options.returning.length === 1
    );
  }

  private isReturningIdWithoutPrimaryKeys(options?: QueryOption): boolean {
    return options?.returning === 'id' && !options.primaryKeys;
  }

  private isMissingPrimaryKeys(options?: QueryOption): boolean {
    return !options?.primaryKeys;
  }

  private hasPrimaryKeys(options?: QueryOption): boolean {
    return typeof options?.primaryKeys === 'string';
  }

  private hasReturning(options?: QueryOption): boolean {
    return typeof options?.returning === 'string';
  }

  private formatOptions(options?: QueryOption) {
    if (options && this.shouldHandleReturning(options)) {
      if (this.isReturningSingleField(options)) {
        options.returning = (options.returning as any)[0];
      }
      if (this.isReturningIdWithoutPrimaryKeys(options)) {
        options.primaryKeys = options.returning;
      }

      if (this.isMissingPrimaryKeys(options)) {
        throw new Error('Primary key is required when using returning.');
      }

      if (this.hasPrimaryKeys(options)) {
        options.primaryKeys = [options.primaryKeys as string];
      }
      if (this.hasReturning(options)) {
        options.returning = [options.returning as string];
      }
    }

    return options;
  }

  private addReturningToQuery(query: string, options?: QueryOption): string {
    if (
      this.type === Database.POSTGRES &&
      this.shouldHandleReturning(options)
    ) {
      return `${query} RETURNING ${(options?.returning as string[]).join(', ')}`;
    }
    return query;
  }

  private async getResult(query: string, result: any, options?: QueryOption) {
    switch (this.type) {
      case Database.POSTGRES:
        return result.rows;

      case Database.MYSQL:
        result = result[0] as any[];

        if (this.shouldHandleReturning(options)) {
          const resultArray = [
            {
              id: (result as any).insertId,
            },
          ];

          result = resultArray;

          if (
            (Array.isArray(options?.returning) &&
              options.returning.length > 1) ||
            (options?.returning?.length === 1 &&
              options?.primaryKeys &&
              options?.returning[0] !== options?.primaryKeys[0])
          ) {
            const where = ((options?.primaryKeys as string[]) ?? [])
              .map((pk) => `${pk} = ?`)
              .join(' AND ');

            const selectReturningQuery = `SELECT ${(options?.returning as string[]).join(', ')} FROM ${this.getTableNameFromQuery(query)} WHERE ${where}`;
            const returningResult = await (
              this.client as unknown as Connection
            ).query(selectReturningQuery, [resultArray[0].id]);
            result = returningResult;
          }
        } else if (result?.insertId) {
          result = [
            {
              id: (result as any).insertId,
            },
          ];
        }

        return result;
    }
  }

  async getClient() {
    switch (this.type) {
      case Database.POSTGRES:
        const { Client } = await import('pg');
        this.client = new Client({
          host: this.host,
          user: this.user,
          password: this.password,
          database: this.database,
          port: this.port,
        });
        await this.client.connect();
        return this.client;

      case Database.MYSQL:
        const mysql = await import('mysql2/promise');
        this.client = await mysql.createConnection({
          host: this.host,
          user: this.user,
          password: this.password,
          database: this.database,
          port: this.port,
        });
        return this.client;
    }
  }

  async testDatabaseConnection(): Promise<boolean> {
    try {
      switch (this.type) {
        case Database.POSTGRES:
        case Database.MYSQL:
          await this.query('SELECT NOW()');
          break;
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  async getPrimaryKeys(tableName: string): Promise<string[]> {
    if (this.primaryKeys[tableName]) {
      return this.primaryKeys[tableName];
    }

    let primaryKeys: string[] = [];

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          WHERE constraint_type = 'PRIMARY KEY'
          AND tc.table_name = ?`,
          [tableName],
        );

        primaryKeys = resultPg.map((row: any) => row.column_name);

        if (primaryKeys.length > 0) {
          this.primaryKeys[tableName] = primaryKeys;
        }

        return primaryKeys;

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
          WHERE TABLE_NAME = ? AND CONSTRAINT_NAME = 'PRIMARY'`,
          [tableName],
        );

        primaryKeys = resultMysql.map((row: any) => row.COLUMN_NAME);

        if (primaryKeys.length > 0) {
          this.primaryKeys[tableName] = primaryKeys;
        }

        return primaryKeys;
    }
  }

  async getForeignKeys(tableName: string): Promise<string[]> {
    if (this.foreignKeysByTable[tableName]) {
      return this.foreignKeysByTable[tableName];
    }

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT kcu.column_name
          FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
          WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = ?;`,
          [tableName],
        );
        return (this.foreignKeysByTable[tableName] = resultPg.map(
          (row: any) => row.column_name,
        ));

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT COLUMN_NAME
          FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
          WHERE TABLE_NAME = ? AND CONSTRAINT_NAME != 'PRIMARY'`,
          [tableName],
        );
        return (this.foreignKeysByTable[tableName] = resultMysql.map(
          (row: any) => row.COLUMN_NAME,
        ));
    }
  }

  async getColumnNameFromRelation(
    tableNameOrigin: string,
    tableNameDestination: string,
  ) {
    if (
      this.columnNameFromRelation[`${tableNameOrigin}.${tableNameDestination}`]
    ) {
      return this.columnNameFromRelation[
        `${tableNameOrigin}.${tableNameDestination}`
      ];
    }

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT
            tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
            FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name = ? AND tc.table_name = ?;`,
          [tableNameOrigin, tableNameDestination],
        );

        if (!resultPg.length) {
          throw new Error(
            `Foreign key ${tableNameOrigin}.${tableNameDestination} not found in database. [getColumnNameFromRelation]`,
          );
        }

        return (this.columnNameFromRelation[
          `${tableNameOrigin}.${tableNameDestination}`
        ] = resultPg[0].column_name);

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT
            TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
            FROM
            INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME = ? AND TABLE_NAME = ?;`,
          [tableNameOrigin, tableNameDestination],
        );

        if (!resultMysql.length) {
          throw new Error(
            `Foreign key ${tableNameOrigin}.${tableNameDestination} not found in database.  [getColumnNameFromRelation]`,
          );
        }

        return (this.columnNameFromRelation[
          `${tableNameOrigin}.${tableNameDestination}`
        ] = resultMysql[0].COLUMN_NAME);

      default:
        throw new Error(`Unsupported database type: ${this.type}`);
    }
  }

  async getRelation1N(
    tableNameOrigin: string,
    tableNameDestination: string,
  ): Promise<string> {
    if (this.relation1N[`${tableNameOrigin}.${tableNameDestination}`]) {
      return this.relation1N[`${tableNameOrigin}.${tableNameDestination}`];
    }

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg = await this.query(
          `SELECT
            tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
            FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name = ? AND tc.table_name = ?;`,
          [tableNameOrigin, tableNameDestination],
        );

        if (!resultPg.length) {
          throw new Error(
            `Foreign key ${tableNameOrigin}.${tableNameDestination} not found in database. [getRelation1N]`,
          );
        }

        return (this.relation1N[`${tableNameOrigin}.${tableNameDestination}`] =
          resultPg[0].column_name);

      case Database.MYSQL:
        const resultMysql = await this.query(
          `SELECT
            TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
            FROM
            INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE() AND REFERENCED_TABLE_NAME = ? AND TABLE_NAME = ?;`,
          [tableNameOrigin, tableNameDestination],
        );

        if (!resultMysql.length) {
          throw new Error(
            `Foreign key ${tableNameOrigin}.${tableNameDestination} not found in database. [getRelation1N]`,
          );
        }

        return (this.relation1N[`${tableNameOrigin}.${tableNameDestination}`] =
          resultMysql[0].COLUMN_NAME);
    }
  }

  async getRelationN2N(
    tableNameOrigin: string,
    tableNameDestination: string,
  ): Promise<RelationN2NResult> {
    if (this.relationN2N[`${tableNameOrigin}.${tableNameDestination}`]) {
      return this.relationN2N[`${tableNameOrigin}.${tableNameDestination}`];
    }

    let tableNameIntermediate = '';
    let columnNameOrigin = '';
    let columnNameDestination = '';
    let primaryKeyDestination = '';

    switch (this.type) {
      case Database.POSTGRES:
        const resultPg1 = await this.query(
          `SELECT
            tc.table_name, kcu.column_name
            FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
              ON tc.constraint_name = kcu.constraint_name
              AND tc.table_schema = kcu.table_schema
            JOIN information_schema.constraint_column_usage AS ccu
              ON ccu.constraint_name = tc.constraint_name
              AND ccu.table_schema = tc.table_schema
            WHERE tc.constraint_type = 'FOREIGN KEY' AND ccu.table_name = ?;`,
          [tableNameOrigin],
        );

        for (const row of resultPg1) {
          const resultPg2 = await this.query(
            `SELECT
                tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
                FROM
                information_schema.table_constraints AS tc
                JOIN information_schema.key_column_usage AS kcu
                  ON tc.constraint_name = kcu.constraint_name
                  AND tc.table_schema = kcu.table_schema
                JOIN information_schema.constraint_column_usage AS ccu
                  ON ccu.constraint_name = tc.constraint_name
                  AND ccu.table_schema = tc.table_schema
                WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = ?;`,
            [row['table_name']],
          );

          for (const row2 of resultPg2) {
            if (row2['foreign_table_name'] === tableNameDestination) {
              tableNameIntermediate = row['table_name'];
              columnNameOrigin = row['column_name'];
              columnNameDestination = row2['column_name'];
              primaryKeyDestination = row2['foreign_column_name'];
              break;
            }
          }
        }

        return (this.relationN2N[`${tableNameOrigin}.${tableNameDestination}`] =
          {
            tableNameIntermediate,
            columnNameOrigin,
            columnNameDestination,
            primaryKeyDestination,
          });

      case Database.MYSQL:
        const resultMysql1 = await this.query(
          `SELECT 
            kcu.TABLE_NAME, 
            kcu.COLUMN_NAME, 
            kcu.REFERENCED_TABLE_NAME AS foreign_table_name, 
            kcu.REFERENCED_COLUMN_NAME AS foreign_column_name
          FROM 
            information_schema.KEY_COLUMN_USAGE AS kcu
          WHERE 
            kcu.REFERENCED_TABLE_NAME = ?
            AND kcu.TABLE_SCHEMA = DATABASE();`,
          [tableNameOrigin],
        );

        for (const row of resultMysql1) {
          const resultMysql2 = await this.query(
            `SELECT 
              kcu.TABLE_NAME, 
              kcu.COLUMN_NAME, 
              kcu.REFERENCED_TABLE_NAME AS foreign_table_name, 
              kcu.REFERENCED_COLUMN_NAME AS foreign_column_name
            FROM 
              information_schema.KEY_COLUMN_USAGE AS kcu
            WHERE 
              kcu.TABLE_NAME = ?
              AND kcu.REFERENCED_TABLE_NAME IS NOT NULL
              AND kcu.TABLE_SCHEMA = DATABASE();`,
            [row['TABLE_NAME']],
          );

          for (const row2 of resultMysql2) {
            if (row2['foreign_table_name'] === tableNameDestination) {
              tableNameIntermediate = row['TABLE_NAME'];
              columnNameOrigin = row['COLUMN_NAME'];
              columnNameDestination = row2['COLUMN_NAME'];
              primaryKeyDestination = row2['foreign_column_name'];
              break;
            }
          }
        }

        return (this.relationN2N[`${tableNameOrigin}.${tableNameDestination}`] =
          {
            tableNameIntermediate,
            columnNameOrigin,
            columnNameDestination,
            primaryKeyDestination,
          });

      default:
        throw new Error(`Unsupported database type: ${this.type}`);
    }
  }

  static parseQueryValue(value: any) {
    switch (typeof value) {
      case 'number':
      case 'boolean':
        return value;

      default:
        return `'${value}'`;
    }
  }

  static objectToWhereClause(obj: any) {
    let whereClause = '';

    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        whereClause += `${key} ${obj[key].operator} ${AbstractDatabase.parseQueryValue(obj[key].value)}`;
      } else {
        whereClause += `${key} = ${AbstractDatabase.parseQueryValue(obj[key])}`;
      }
    }

    return whereClause;
  }

  async transaction(queries: TransactionQueries[]) {
    this.eventEmitter.emit('transaction', { queries });

    if (!this.client) {
      await this.getClient();
    }

    const results: any[] = [];

    for (let i = 0; i < queries.length; i++) {
      queries[i].options = this.formatOptions(queries[i].options);
      queries[i].query = this.addReturningToQuery(
        queries[i].query,
        queries[i].options,
      );
    }

    try {
      switch (this.type) {
        case Database.POSTGRES:
          await (this.client as Client).query('BEGIN');
          for (const { query, values, options } of queries) {
            const resultPg = await (this.client as Client).query(
              this.replacePlaceholders(query),
              values,
            );
            results.push(this.getResult(query, resultPg, options));
          }
          await (this.client as Client).query('COMMIT');
          break;

        case Database.MYSQL:
          await (this.client as Connection).beginTransaction();
          for (const { query, values, options } of queries) {
            const resultMySQL = await (
              this.client as unknown as Connection
            ).query(query, values);
            results.push(this.getResult(query, resultMySQL, options));
          }
          await (this.client as Connection).commit();
          break;
      }
    } catch (error) {
      switch (this.type) {
        case Database.POSTGRES:
          await (this.client as Client).query('ROLLBACK');
          break;

        case Database.MYSQL:
          await (this.client as Connection).rollback();
          break;
      }
      throw error;
    } finally {
      if (this.autoClose) {
        await this.client?.end();
        this.client = null;
      }
    }

    return results;
  }

  async query(query: string, values?: any[], options?: QueryOption) {
    this.eventEmitter.emit('query', { query, values, options });
    if (!this.client) {
      await this.getClient();
    }
    let result;

    options = this.formatOptions(options);
    query = this.addReturningToQuery(query, options);

    try {
      switch (this.type) {
        case Database.POSTGRES:
          result = await (this.client as Client).query(
            this.replacePlaceholders(query),
            values,
          );

          break;

        case Database.MYSQL:
          result = await (this.client as unknown as Connection).query(
            query,
            values,
          );

          break;
      }
    } catch (error) {
      console.error({
        error,
        query,
        values,
        options,
      });
      this.eventEmitter.emit('error', { error, query, values, options });
    }

    result = await this.getResult(query, result, options);

    this.eventEmitter.emit('query', { result });

    if (this.autoClose) {
      await this.client?.end();
      this.client = null;
    }

    return result;
  }
}
