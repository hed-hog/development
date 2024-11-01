import * as chalk from 'chalk';
import { Database } from './database';
import { PostgresDatabase } from './postgres.database';
import { MySQLDatabase } from './mysql.database';

export class DatabaseFactory {
  public static create(
    type: Database,
    host: string,
    user: string,
    password: string,
    database: string,
    port: number,
  ) {
    switch (type) {
      case Database.POSTGRES:
        return new PostgresDatabase(host, user, password, database, port);

      case Database.MYSQL:
        return new MySQLDatabase(host, user, password, database, port);

      default:
        console.info(chalk.yellow(`[WARN] Unsupported Database: ${type}`));
    }
  }
}
