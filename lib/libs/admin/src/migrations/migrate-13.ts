import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
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
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete('role_menus', { role_id: 1 });
  }
}
