import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
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

    const adminAccessRoutes = [88, 1, 3];

    for (const routeId of adminAccessRoutes) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_routes')
        .values({
          role_id: 3,
          route_id: routeId,
        })
        .execute();
    }

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role_routes')
      .values({
        role_id: 2,
        route_id: 3,
      })
      .execute();

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
    await queryRunner.manager.delete('role_routes', { role_id: 1 });
    await queryRunner.manager.delete('role_routes', { role_id: 2 });
  }
}
