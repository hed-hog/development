import { idColumn, timestampColumn } from '@hedhog/utils';

import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';
import { Menu } from '../entities';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
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
      const m = await queryRunner.connection.getRepository(Menu).save({
        url: menu.url,
        order: menu.order,
        icon: menu.icon,
        slug: menu.slug,
      });

      console.log('menuInserted', m);

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('menu_translations', ['menu_id', 'locale_id', 'name'])
        .values([
          {
            menu_id: m.id,
            locale_id: 1,
            name: menu.name_en,
          },
          {
            menu_id: m.id,
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('routes', ['url', 'method'])
      .values([
        {
          url: '/auth/verify',
          method: 'GET',
        },
        {
          url: '/menus',
          method: 'GET',
        },
        {
          url: '/menus/system',
          method: 'GET',
        },
        {
          url: '/menus/:menuId',
          method: 'GET',
        },
        {
          url: '/menus',
          method: 'POST',
        },
        {
          url: '/menus/:menuId',
          method: 'PATCH',
        },
        {
          url: '/menus/:menuId/roles',
          method: 'GET',
        },
        {
          url: '/menus/:menuId/roles',
          method: 'PATCH',
        },
        {
          url: '/menus/:menuId/screens',
          method: 'GET',
        },
        {
          url: '/menus/:menuId/screens',
          method: 'PATCH',
        },
        {
          url: '/menus',
          method: 'DELETE',
        },
        {
          url: '/menus/order',
          method: 'PATCH',
        },
        {
          url: '/roles',
          method: 'GET',
        },
        {
          url: '/roles/:roleId',
          method: 'GET',
        },
        {
          url: '/roles/:roleId/users',
          method: 'GET',
        },
        {
          url: '/roles/:roleId/menus',
          method: 'GET',
        },
        {
          url: '/roles/:roleId/routes',
          method: 'GET',
        },
        {
          url: '/roles/:roleId/screens',
          method: 'GET',
        },
        {
          url: '/roles/:roleId/users',
          method: 'PATCH',
        },
        {
          url: '/roles/:roleId/menus',
          method: 'PATCH',
        },
        {
          url: '/roles/:roleId/routes',
          method: 'PATCH',
        },
        {
          url: '/roles/:roleId/screens',
          method: 'PATCH',
        },
        {
          url: '/roles',
          method: 'POST',
        },
        {
          url: '/roles/:roleId',
          method: 'PATCH',
        },
        {
          url: '/roles',
          method: 'DELETE',
        },
        {
          url: '/screens',
          method: 'GET',
        },
        {
          url: '/screens/:screenId',
          method: 'GET',
        },
        {
          url: '/screens/:screenId/roles',
          method: 'GET',
        },
        {
          url: '/screens/:screenId/routes',
          method: 'GET',
        },
        {
          url: '/screens/:screenId/roles',
          method: 'PATCH',
        },
        {
          url: '/screens/:screenId/routes',
          method: 'PATCH',
        },
        {
          url: '/screens',
          method: 'POST',
        },
        {
          url: '/screens/:screenId',
          method: 'PATCH',
        },
        {
          url: '/screens',
          method: 'DELETE',
        },
        {
          url: '/settings',
          method: 'GET',
        },
        {
          url: '/settings/:settingId',
          method: 'GET',
        },
        {
          url: '/settings',
          method: 'POST',
        },
        {
          url: '/settings/:settingId',
          method: 'PATCH',
        },
        {
          url: '/settings/groups',
          method: 'GET',
        },
        {
          url: '"/settings/groups/:slug"',
          method: 'GET',
        },
        {
          url: '"/settings/:slug"',
          method: 'PUT',
        },
        {
          url: '/settings',
          method: 'DELETE',
        },
        {
          url: '/users',
          method: 'GET',
        },
        {
          url: '/users/:userId',
          method: 'GET',
        },
        {
          url: '/users/:userId/roles',
          method: 'GET',
        },
        {
          url: '/users',
          method: 'POST',
        },
        {
          url: '/users/:userId',
          method: 'PATCH',
        },
        {
          url: '/users/:userId/roles',
          method: 'PATCH',
        },
        {
          url: '/users',
          method: 'DELETE',
        },
        {
          url: '/routes',
          method: 'GET',
        },
        {
          url: '/routes',
          method: 'POST',
        },
        {
          url: '/routes',
          method: 'DELETE',
        },
        {
          url: '/routes/:routeId',
          method: 'GET',
        },
        {
          url: '/routes/:routeId',
          method: 'PATCH',
        },
        {
          url: '/routes/:routeId/roles',
          method: 'GET',
        },
        {
          url: '/routes/:routeId/roles',
          method: 'PATCH',
        },
        {
          url: '/routes/:routeId/screens',
          method: 'GET',
        },
        {
          url: '/routes/:routeId/screens',
          method: 'PATCH',
        },
      ])
      .execute();
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('routes');
  }
}
