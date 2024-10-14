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
          {
            name: 'slug',
            type: 'varchar',
            length: '63',
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
            isPrimary: true,
          },
          {
            name: 'group_id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
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
        name: 'settings',
        columns: [
          idColumn(),
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
            length: '63',
          },
          {
            name: 'group_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['string', 'number', 'boolean', 'json'],
            default: "'string'",
          },
          {
            name: 'value',
            type: 'varchar',
            length: '1023',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
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
        name: 'setting_translations',
        columns: [
          {
            name: 'locale_id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'setting_id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            length: '255',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
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
            columnNames: ['setting_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'settings',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('setting_translations');
    await queryRunner.dropTable('settings');
    await queryRunner.dropTable('setting_group_translations');
    await queryRunner.dropTable('setting_groups');
  }
}
