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
      '/users',
      0,
      managementId,
      'users',
    );
    await this.insertMenu(
      queryRunner,
      'Roles',
      '/roles',
      1,
      managementId,
      'circles',
    );
    await this.insertMenu(
      queryRunner,
      'Screens',
      '/screens',
      2,
      managementId,
      'screem',
    );
    await this.insertMenu(
      queryRunner,
      'Menus',
      '/menus',
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
  ): Promise<number> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menus')
      .values({
        name,
        url,
        order,
        menu_id: menuId,
        icon,
        created_at: () => 'NOW()',
        updated_at: () => 'NOW()',
      })
      .execute();

    const result = await queryRunner.manager
      .createQueryBuilder()
      .select('id')
      .from('menus', 'menu')
      .where('name = :name', { name })
      .andWhere('url = :url', { url })
      .andWhere('order = :order', { order })
      .andWhere('menu_id = :menuId', { menuId })
      .andWhere('icon = :icon', { icon })
      .orderBy('created_at', 'DESC')
      .limit(1)
      .getRawOne();

    return result.id;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menus');
    await queryRunner.dropTable('menu_screens');
  }
}
