import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { idColumn, timestampColumn } from '@hedhog/utils';

export class Migrate1727197435357 implements MigrationInterface {
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
      '/management',
      1,
      null,
      'settings',
    );

    await this.insertMenu(
      queryRunner,
      'Persons',
      '/persons',
      2,
      null,
      'user-check',
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
      'device-tv',
    );
    await this.insertMenu(
      queryRunner,
      'Menus',
      '/management/menus',
      3,
      managementId,
      'menu',
    );
    await this.insertMenu(
      queryRunner,
      'Routes',
      '/management/routes',
      4,
      managementId,
      'route',
    );
    await this.insertMenu(
      queryRunner,
      'Settings',
      '/management/settings',
      5,
      managementId,
      'settings',
    );

    const personId = await this.insertMenu(
      queryRunner,
      'Persons',
      null,
      6,
      managementId,
      'user-check',
    );

    await this.insertMenu(
      queryRunner,
      'Address Types',
      '/management/persons/address-types',
      6,
      personId,
      'home-link',
    );
    await this.insertMenu(
      queryRunner,
      'Contact Types',
      '/management/persons/contact-types',
      7,
      personId,
      'address-book',
    );
    await this.insertMenu(
      queryRunner,
      'Custom Types',
      '/management/persons/custom-types',
      8,
      personId,
      'adjustments',
    );
    await this.insertMenu(
      queryRunner,
      'Document Types',
      '/management/persons/document-types',
      9,
      personId,
      'file-search',
    );
    await this.insertMenu(
      queryRunner,
      'Person Types',
      '/management/persons/person-types',
      10,
      personId,
      'id',
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
    const result = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menus')
      .values({
        name,
        url,
        order,
        menu_id: menuId,
        icon,
      })
      .returning('id')
      .execute();

    return result.raw[0].id;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menu_screens');
    await queryRunner.dropTable('menus');
  }
}
