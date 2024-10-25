import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'screens',
        columns: [
          idColumn(),
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'screen_translations',
        columns: [
          foreignColumn({ name: 'screen_id', isPrimary: true }),
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['screen_id'],
            referencedTableName: 'screens',
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
    );
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('screens');
  }
}
