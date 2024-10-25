import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';

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
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('multifactors');
    await queryRunner.dropTable('users');
  }
}
