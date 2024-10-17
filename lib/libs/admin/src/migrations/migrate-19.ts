import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';

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
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          foreignColumn({ name: 'group_id', isPrimary: true }),
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
          foreignColumn({ name: 'group_id' }),
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
            length: '63',
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
          {
            name: 'userOverride',
            type: 'boolean',
            default: false,
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
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          foreignColumn({ name: 'setting_id', isPrimary: true }),
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

    await queryRunner.createTable(
      new Table({
        name: 'setting_users',
        columns: [
          foreignColumn({ name: 'user_id', isPrimary: true }),
          foreignColumn({ name: 'setting_id', isPrimary: true }),
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
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
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
    await queryRunner.dropTable('setting_users');
    await queryRunner.dropTable('setting_translations');
    await queryRunner.dropTable('settings');
    await queryRunner.dropTable('setting_group_translations');
    await queryRunner.dropTable('setting_groups');
  }
}
