import { foreignColumn, timestampColumn } from '@hedhog/utils';
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
        name: 'route_screens',
        columns: [
          foreignColumn({ name: 'route_id', isPrimary: true }),
          foreignColumn({ name: 'screen_id', isPrimary: true }),
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('route_screens', [
      new TableForeignKey({
        columnNames: ['route_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'routes',
        onDelete: 'CASCADE',
        name: 'fk_route_screens_routes',
      }),
      new TableForeignKey({
        columnNames: ['screen_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screens',
        onDelete: 'CASCADE',
        name: 'fk_route_screens_screens',
      }),
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('route_screens');
  }
}