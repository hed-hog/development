import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1726764453806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO screens(name, slug, description, icon) VALUES('Usuários', '/management/users', 'Confira todos os usuários cadastrados no sistema.', 'IconUser');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM screens WHERE slug = '/management/users'`,
    );
  }
}
