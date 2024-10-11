import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { idColumn, timestampColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'setting_groups',
        columns: [
          idColumn(),
          {
            name: 'icon',
            type: 'varchar',
            length: '31',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'setting_group_translations',
        columns: [
          {
            name: 'locale_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'group_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
          {
            columnNames: ['locale_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'locales',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'setting_groups',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'setting_values',
        columns: [
          idColumn(),
          {
            name: 'value',
            type: 'varchar',
            length: '1023',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'label',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'setting_id',
            type: 'int',
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    // Criação das foreign keys
    await queryRunner.createForeignKey(
      'setting_values',
      new TableForeignKey({
        columnNames: ['setting_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'settings',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('setting_values');
    await queryRunner.dropTable('settings');
  }
}
