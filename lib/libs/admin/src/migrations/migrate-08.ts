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

    await queryRunner.manager
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
    await queryRunner.dropTable('role_screens');
  }
}
