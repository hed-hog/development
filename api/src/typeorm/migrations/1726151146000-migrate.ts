import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumn, idColumn } from '@hedhog/utils';

export class Migrate1726151146000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'extension',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'bytes',
            type: 'int',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
