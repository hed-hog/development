import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';
import * as bcrypt from 'bcrypt';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'multifactors',
        columns: [
          idColumn(),
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'multifactor_translations',
        columns: [
          foreignColumn({ name: 'multifactor_id', isPrimary: true }),
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          {
            name: 'name',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['multifactor_id'],
            referencedTableName: 'multifactors',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['locale_id'],
            referencedTableName: 'locales',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      }),
      true,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('multifactors', ['id', 'slug'])
      .values([
        {
          id: 1,
          slug: 'email',
        },
        {
          id: 2,
          slug: 'application',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('multifactor_translations', ['multifactor_id', 'locale_id', 'name'])
      .values([
        {
          multifactor_id: 1,
          locale_id: 1,
          name: 'Email',
        },
        {
          multifactor_id: 1,
          locale_id: 2,
          name: 'E-mail',
        },
        {
          multifactor_id: 2,
          locale_id: 1,
          name: 'Application',
        },
        {
          multifactor_id: 2,
          locale_id: 2,
          name: 'Aplicativo',
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          idColumn(),
          foreignColumn({ name: 'multifactor_id', isNullable: true }),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        columnNames: ['multifactor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'multifactors',
        name: 'fk_users_to_multifactors_on_multifactor_id',
        onDelete: 'Cascade',
      }),
    ]);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users', ['name', 'email', 'password'])
      .values([
        {
          name: 'Superuser',
          email: 'root@hedhog.com',
          password: await bcrypt.hash(`hedhog`, 12),
        },
        {
          name: 'User',
          email: 'user@hedhog.com',
          password: await bcrypt.hash(`hedhog`, 12),
        },
      ])
      .execute();
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('multifactors');
    await queryRunner.dropTable('users');
  }
}
