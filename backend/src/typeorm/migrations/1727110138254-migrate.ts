import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1727110138254 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    const screenIdScreen = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("screens", "s")
      .where("slug = :slug", { slug: "/management/screens" })
      .execute();

    const screenIdRole = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("screens", "s")
      .where("slug = :slug", { slug: "/management/roles" })
      .execute();

    const screenIdUser = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("screens", "s")
      .where("slug = :slug", { slug: "/management/users" })
      .execute();

    const screenIdMenu = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("screens", "s")
      .where("slug = :slug", { slug: "/management/menus" })
      .execute();

    for (const { url, screendId } of [
      { url: "/screens%", screendId: screenIdScreen[0].id },
      { url: "/roles%", screendId: screenIdRole[0].id },
      { url: "/users%", screendId: screenIdUser[0].id },
      { url: "/menus%", screendId: screenIdMenu[0].id },
    ]) {
      const routesScreens = await queryRunner.manager
        .createQueryBuilder()
        .select()
        .from("routes", "s")
        .where("s.url LIKE :url", { url })
        .execute();

      for (const route of routesScreens) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into("route_screens")
          .values({
            route_id: route.id,
            screen_id: screendId,
          })
          .execute();
      }
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete("route_screens", {});
  }
}
