import { timestampColumn } from '@hedhog/utils';
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
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'menu_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
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

    const menus = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('menus', 'm')
      .execute();

    for (const menu of menus) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_menus')
        .values({
          role_id: 1,
          menu_id: menu.id,
        });
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_menus');
  }
}
