import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
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
          url: '/menus',
          method: 'DELETE',
        },
        {
          url: '/menus/order',
          method: 'PATCH',
        },
        {
          url: '/permissions',
          method: 'GET',
        },
        {
          url: '/permissions/:permissionId',
          method: 'GET',
        },
        {
          url: '/permissions',
          method: 'POST',
        },
        {
          url: '/permissions/:permissionId',
          method: 'PATCH',
        },
        {
          url: '/permissions',
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
          url: '/users',
          method: 'POST',
        },
        {
          url: '/users/:userId',
          method: 'PATCH',
        },
        {
          url: '/users',
          method: 'DELETE',
        },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('routes');
  }
}
