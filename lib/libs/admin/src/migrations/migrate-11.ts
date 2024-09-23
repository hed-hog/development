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
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_routes');
  }
}
