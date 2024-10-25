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
        name: 'role_menus',
        columns: [
          foreignColumn({ name: 'role_id', isPrimary: true }),
          foreignColumn({ name: 'menu_id', isPrimary: true }),
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_menus', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        name: 'fk_role_menus_roles',
      }),
      new TableForeignKey({
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menus',
        onDelete: 'CASCADE',
        name: 'fk_role_menus_menus',
      }),
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_menus');
  }
}
