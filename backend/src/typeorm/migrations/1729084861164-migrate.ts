import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1729084861164 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    const menus = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("menus", "m")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("role_menus", ["role_id", "menu_id"])
      .values(
        menus.map((menu) => ({
          role_id: 1,
          menu_id: menu.id,
        })),
      )
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("role_menus", ["role_id", "menu_id"])
      .values({
        role_id: 2,
        menu_id: 1,
      });
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete("role_menus", { role_id: 1 });
    await queryRunner.manager.delete("role_menus", { role_id: 2 });
  }
}
