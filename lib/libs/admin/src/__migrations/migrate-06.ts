import { idColumn, timestampColumn } from '@hedhog/utils';
import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'routes',
        columns: [
          idColumn(),
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'method',
            type: 'enum',
            enum: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS', 'HEAD'],
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        indices: [
          {
            columnNames: ['url', 'method'],
            isUnique: true,
          },
        ],
      }),
    );
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('routes');
  }
}
