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
        name: 'menus',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
            default: 0,
            unsigned: true,
          },
          {
            name: 'menu_id',
            type: 'int',
            isNullable: true,
            unsigned: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'menu_screens',
        columns: [
          {
            name: 'menu_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'screen_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'menu_screens',
      new TableForeignKey({
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menus',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'menu_screens',
      new TableForeignKey({
        columnNames: ['screen_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screens',
        onDelete: 'CASCADE',
      }),
    );

    //System Populating
    await this.insertMenu(queryRunner, 'Dashboard', '/', 0, null, 'dashboard');
    const managementId = await this.insertMenu(
      queryRunner,
      'Management',
      null,
      1,
      null,
      'settings',
    );
    await this.insertMenu(
      queryRunner,
      'Users',
      '/management/users',
      0,
      managementId,
      'users',
    );
    await this.insertMenu(
      queryRunner,
      'Roles',
      '/management/roles',
      1,
      managementId,
      'circles',
    );
    await this.insertMenu(
      queryRunner,
      'Screens',
      '/management/screens',
      2,
      managementId,
      'screem',
    );
    await this.insertMenu(
      queryRunner,
      'Menus',
      '/management/menus',
      3,
      managementId,
      'menu',
    );
  }

  private async insertMenu(
    queryRunner: QueryRunner,
    name: string,
    url: string,
    order: number,
    menuId: number,
    icon: string,
  ) {
    await queryRunner.query(`
      INSERT INTO menus (name, url, order, menu_id, icon, created_at, updated_at)
      VALUES ('${name}', '${url}', ${order}, ${menuId}, '${icon}', NOW(), NOW())
    `);

    return (
      await queryRunner.query(`
      SELECT id
      FROM menus
      WHERE name = '${name}' AND url = '${url}' AND order = ${order} AND menu_id = ${menuId} AND icon = '${icon}'
      ORDER BY created_at DESC
      LIMIT 1
    `)
    )[0].id;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menus');
    await queryRunner.dropTable('menu_screens');
  }
}
