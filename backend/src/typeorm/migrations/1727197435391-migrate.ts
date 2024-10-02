import { idColumn, timestampColumn } from '@hedhog/utils';

import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class Migrate1727197435391 implements MigrationInterface {
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
      }),
    );

    await queryRunner.createUniqueConstraint(
      'routes',
      new TableUnique({
        columnNames: ['url', 'method'],
        name: 'unique_routes',
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
        {
          url: '/persons',
          method: 'GET',
        },
        {
          url: '/persons',
          method: 'POST',
        },
        {
          url: '/persons',
          method: 'DELETE',
        },
        {
          url: '/persons/:personId',
          method: 'GET',
        },
        {
          url: '/persons/:personId',
          method: 'PATCH',
        },
        {
          url: '/person-types',
          method: 'GET',
        },
        {
          url: '/person-types',
          method: 'POST',
        },
        {
          url: '/person-types',
          method: 'DELETE',
        },
        {
          url: '/person-types/:personTypeId',
          method: 'GET',
        },
        {
          url: '/person-types/:personTypeId',
          method: 'PATCH',
        },
        {
          url: '/address-types',
          method: 'GET',
        },
        {
          url: '/address-types',
          method: 'POST',
        },
        {
          url: '/address-types',
          method: 'DELETE',
        },
        {
          url: '/address-types/:addressTypeId',
          method: 'GET',
        },
        {
          url: '/address-types/:addressTypeId',
          method: 'PATCH',
        },
        {
          url: '/contact-types',
          method: 'GET',
        },
        {
          url: '/contact-types',
          method: 'POST',
        },
        {
          url: '/contact-types',
          method: 'DELETE',
        },
        {
          url: '/contact-types/:contactTypeId',
          method: 'GET',
        },
        {
          url: '/contact-types/:contactTypeId',
          method: 'PATCH',
        },
        {
          url: '/custom-types',
          method: 'GET',
        },
        {
          url: '/custom-types',
          method: 'POST',
        },
        {
          url: '/custom-types',
          method: 'DELETE',
        },
        {
          url: '/custom-types/:customTypeId',
          method: 'GET',
        },
        {
          url: '/custom-types/:customTypeId',
          method: 'PATCH',
        },
        {
          url: '/document-types',
          method: 'GET',
        },
        {
          url: '/document-types',
          method: 'POST',
        },
        {
          url: '/document-types',
          method: 'DELETE',
        },
        {
          url: '/document-types/:documentTypeId',
          method: 'GET',
        },
        {
          url: '/document-types/:documentTypeId',
          method: 'PATCH',
        },
      ])
      .execute();
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('routes');
  }
}
