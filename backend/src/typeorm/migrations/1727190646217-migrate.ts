import { idColumn, timestampColumn } from "@hedhog/utils";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1727190646217 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("roles", ["id", "name", "description"])
      .values([
        {
          id: 1,
          name: "Administrator",
          description: "System administrator",
        },
        {
          id: 2,
          name: "Screen Manager",
          description: "Screen manager",
        },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("roles");
  }
}
