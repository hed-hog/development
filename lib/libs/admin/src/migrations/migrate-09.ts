import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    const screens = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from('screens', 's')
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
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_screens');
  }
}
