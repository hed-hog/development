import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { foreignColumn, idColumn, timestampColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menus',
        columns: [
          idColumn(),
          foreignColumn({ name: 'menu_id', isNullable: true }),
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
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
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        indices: [{ columnNames: ['slug'], isUnique: true }],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'menu_translations',
        columns: [
          foreignColumn({ name: 'menu_id', isPrimary: true }),
          foreignColumn({ name: 'locale_id', isPrimary: true }),
          {
            name: 'name',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ['menu_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'menus',
            onDelete: 'CASCADE',
          }),
          new TableForeignKey({
            columnNames: ['locale_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'locales',
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'menu_screens',
        columns: [
          foreignColumn({ name: 'menu_id', isPrimary: true }),
          foreignColumn({ name: 'screen_id', isPrimary: true }),
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

    const menus = [
      {
        name_en: 'Dashboard',
        name_pt: 'Dashboard',
        url: '/',
        order: 0,
        icon: 'dashboard',
        slug: 'dashboard',
      },
      {
        name_en: 'Management',
        name_pt: 'Gereciamento',
        url: '/management',
        order: 1,
        icon: 'settings',
        slug: 'management',
      },
    ];

    for (const menu of menus) {
      const m = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('menus', ['url', 'order', 'icon', 'slug'])
        .values({
          url: menu.url,
          order: menu.order,
          icon: menu.icon,
          slug: menu.slug,
        })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('menu_translations', ['menu_id', 'locale_id', 'name'])
        .values([
          {
            menu_id: m.raw.insertId,
            locale_id: 1,
            name: menu.name_en,
          },
          {
            menu_id: m.raw.insertId,
            locale_id: 2,
            name: menu.name_pt,
          },
        ])
        .execute();
    }

    const menusManagement = [
      {
        name_en: 'Users',
        name_pt: 'Usuários',
        url: '/management/users',
        order: 0,
        icon: 'users',
        slug: 'management/users',
      },
      {
        name_en: 'Roles',
        name_pt: 'Funções',
        url: '/management/roles',
        order: 1,
        icon: 'circles',
        slug: 'management/roles',
      },
      {
        name_en: 'Screens',
        name_pt: 'Telas',
        url: '/management/screens',
        order: 2,
        icon: 'device-tv',
        slug: 'management/screens',
      },
      {
        name_en: 'Menus',
        name_pt: 'Menus',
        url: '/management/menus',
        order: 3,
        icon: 'menu',
        slug: 'management/menus',
      },
      {
        name_en: 'Routes',
        name_pt: 'Rotas',
        url: '/management/routes',
        order: 4,
        icon: 'route',
        slug: 'management/routes',
      },
      {
        name_en: 'Settings',
        name_pt: 'Configurações',
        url: '/management/settings',
        order: 5,
        icon: 'settings',
        slug: 'management/settings',
      },
    ];

    const menuManagement = await queryRunner.manager
      .createQueryBuilder()
      .select('id')
      .from('menus', 'm')
      .where('m.url = :url', { url: '/management' })
      .execute();

    for (const menu of menusManagement) {
      const m = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('menus', ['url', 'order', 'icon', 'menu_id', 'slug'])
        .values({
          url: menu.url,
          order: menu.order,
          icon: menu.icon,
          menu_id: menuManagement[0].id,
          slug: menu.slug,
        })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('menu_translations', ['menu_id', 'locale_id', 'name'])
        .values([
          {
            menu_id: m.raw.insertId,
            locale_id: 1,
            name: menu.name_en,
          },
          {
            menu_id: m.raw.insertId,
            locale_id: 2,
            name: menu.name_pt,
          },
        ])
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menu_screens');
    await queryRunner.dropTable('menus');
  }
}
