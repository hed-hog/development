import { idColumn, timestampColumn } from '@hedhog/utils';

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class Migrate implements MigrationInterface {
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

    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'role_screens',
        columns: [
          {
            name: 'role_id',
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
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_screens', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        name: 'fk_role_screens_roles',
      }),
      new TableForeignKey({
        columnNames: ['screen_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screens',
        onDelete: 'CASCADE',
        name: 'fk_role_screens_screen',
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'role_users',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_users', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        name: 'fk_role_users_roles',
      }),

      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'fk_role_users_user',
      }),
    ]);

    await queryRunner.createTable(
      new Table({
        name: 'role_routes',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'route_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_routes', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        name: 'fk_role_routes_roles',
      }),
      new TableForeignKey({
        columnNames: ['route_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'routes',
        onDelete: 'CASCADE',
        name: 'fk_role_routes_routes',
      }),
    ]);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('routes')
      .values([
        { url: '/auth/verify', method: 'GET' },
        { url: '/menus', method: 'GET' },
        { url: '/menus/system', method: 'GET' },
        { url: '/menus/:menuId', method: 'GET' },
        { url: '/menus', method: 'POST' },
        { url: '/menus/:menuId', method: 'PATCH' },
        { url: '/menus', method: 'DELETE' },
        { url: '/menus/order', method: 'PATCH' },
        { url: '/permissions', method: 'GET' },
        { url: '/permissions/:permissionId', method: 'GET' },
        { url: '/permissions', method: 'POST' },
        { url: '/permissions/:permissionId', method: 'PATCH' },
        { url: '/permissions', method: 'DELETE' },
        { url: '/screens', method: 'GET' },
        { url: '/screens/:screenId', method: 'GET' },
        { url: '/screens', method: 'POST' },
        { url: '/screens/:screenId', method: 'PATCH' },
        { url: '/screens', method: 'DELETE' },
        { url: '/settings', method: 'GET' },
        { url: '/settings/:settingId', method: 'GET' },
        { url: '/settings', method: 'POST' },
        { url: '/settings/:settingId', method: 'PATCH' },
        { url: '/settings', method: 'DELETE' },
        { url: '/users', method: 'GET' },
        { url: '/users/:userId', method: 'GET' },
        { url: '/users', method: 'POST' },
        { url: '/users/:userId', method: 'PATCH' },
        { url: '/users', method: 'DELETE' },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values({
        id: 1,
        name: 'Administrator',
        description: 'System administrator',
      })
      .execute();

    const routes = await queryRunner.manager
      .createQueryBuilder()
      .select('id')
      .from('routes', 'routes')
      .getRawMany();

    for (const route of routes) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_routes')
        .values({
          role_id: 1,
          route_id: route.id,
        })
        .execute();
    }
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_routes');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('role_screens');
    await queryRunner.dropTable('role_users');
    await queryRunner.dropTable('routes');
  }
}
