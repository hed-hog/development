import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1729113244551 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("role_users")
      .values([
        { role_id: 1, user_id: 1 },
        { role_id: 2, user_id: 2 },
        { role_id: 3, user_id: 2 },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete("role_users", { role_id: 1 });
    await queryRunner.manager.delete("role_users", { role_id: 2 });
  }
}
