import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { idColumn, timestampColumn, foreignColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          idColumn(),
          {
            name: 'code',
            type: 'char',
            length: '3',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'locales',
        columns: [
          idColumn(),
          {
            name: 'code',
            type: 'char',
            length: '2',
            isNullable: false,
          },
          {
            name: 'region',
            type: 'char',
            length: '2',
            isNullable: false,
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'country_translations',
        columns: [
          foreignColumn({ name: 'country_id', isPrimary: true }),
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          {
            name: 'name',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
          {
            columnNames: ['country_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'countries',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['locale_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'locales',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('locales');
  }
}
