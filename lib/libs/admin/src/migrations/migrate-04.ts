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
        name: 'fk_role_screens_screens',
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
        name: 'fk_role_users_users',
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles', ['id', 'name', 'description'])
      .values([
        {
          id: 1,
          name: 'Administrator',
          description: 'System administrator',
        },
        {
          id: 2,
          name: 'Screen Manager',
          description: 'Screen manager',
        },
      ])
      .execute();

    const routes = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('routes', 'r')
      .execute();

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

    const routesScreens = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('routes', 's')
      .where('s.url LIKE :url', { url: '/screens%' })
      .execute();

    for (const route of routesScreens) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_routes')
        .values({
          role_id: 2,
          route_id: route.id,
        })
        .execute();
    }

    await queryRunner.createTable(
      new Table({
        name: 'route_screens',
        columns: [
          {
            name: 'route_id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'screen_id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('route_screens', [
      new TableForeignKey({
        columnNames: ['route_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'routes',
        onDelete: 'CASCADE',
        name: 'fk_route_screens_routes',
      }),
      new TableForeignKey({
        columnNames: ['screen_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screens',
        onDelete: 'CASCADE',
        name: 'fk_route_screens_screens',
      }),
    ]);

    const screens = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('screens', ['name', 'slug', 'description', 'icon'])
      .values([
        {
          name: 'Users',
          slug: '/management/users',
          description: 'Check all users registered in the system.',
          icon: 'users',
        },
        {
          name: 'Roles',
          slug: '/management/roles',
          description: 'Check all roles registered in the system.',
          icon: 'circles',
        },
        {
          name: 'Screens',
          slug: '/management/screens',
          description: 'Check all screens registered in the system.',
          icon: 'monitor',
        },
        {
          name: 'Menus',
          slug: '/management/menus',
          description: 'Check all menus registered in the system.',
          icon: 'menu',
        },
      ])
      .returning('id')
      .execute();

    for (const screen of screens.raw) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_screens')
        .values({
          role_id: 1,
          screen_id: screen.id,
        })
        .execute();
    }

    const screenIdScreen = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/screens' })
      .execute();
    const screenIdRole = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/roles' })
      .execute();
    const screenIdUser = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/users' })
      .execute();
    const screenIdMenu = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
      .where('slug = :slug', { slug: '/management/menus' })
      .execute();

    for (const { url, screendId } of [
      { url: '/screens%', screendId: screenIdScreen[0].id },
      { url: '/roles%', screendId: screenIdRole[0].id },
      { url: '/users%', screendId: screenIdUser[0].id },
      { url: '/menus%', screendId: screenIdMenu[0].id },
    ]) {
      const routesScreens = await queryRunner.manager
        .createQueryBuilder()
        .select()
        .from('routes', 's')
        .where('s.url LIKE :url', { url })
        .execute();

      for (const route of routesScreens) {
        console.log({
          route_id: route.id,
          screen_id: screendId,
        });

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('route_screens')
          .values({
            route_id: route.id,
            screen_id: screendId,
          })
          .execute();
      }
    }
  }
  async down(queryRunner: QueryRunner) {
    for (const slug of [
      '/management/users',
      '/management/roles',
      '/management/screens',
      '/management/menus',
    ]) {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from('screens')
        .where('slug = :slug', { slug })
        .execute();
    }

    await queryRunner.dropTable('role_routes');
    await queryRunner.dropTable('role_screens');
    await queryRunner.dropTable('role_users');
    await queryRunner.dropTable('role_menus');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('route_screens');
    await queryRunner.dropTable('routes');
  }
}
