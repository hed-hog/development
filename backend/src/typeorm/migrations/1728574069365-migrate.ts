import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1728574069365 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    const screens = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("screens", "s")
      .execute();

    for (const screen of screens) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("role_screens")
        .values({
          role_id: 1,
          screen_id: screen.id,
        })
        .execute();
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete("role_screens", { role_id: 1 });
  }
}
