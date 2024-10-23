import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.createTable(
      new Table({
        name: 'translation_namespaces',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
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
        name: 'translations',
        columns: [
          idColumn(),
          foreignColumn({ name: 'locale_id' }),
          foreignColumn({ name: 'namespace_id' }),
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'varchar',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        indices: [
          {
            columnNames: ['locale_id', 'namespace_id', 'name'],
            isUnique: true,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['locale_id'],
            referencedTableName: 'locales',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['namespace_id'],
            referencedTableName: 'translation_namespaces',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('translations');
    await queryRunner.dropTable('translation_namespaces');
  }
}
