import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('screens')
      .values({
        name: 'Usuários',
        slug: '/management/users',
        description: 'Confira todos os usuários cadastrados no sistema.',
        icon: 'IconUser',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('screens')
      .where('slug = :slug', { slug: '/management/users' })
      .execute();
  }
}
