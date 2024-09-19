import { idColumn, timestampColumn } from "@hedhog/utils";

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1726761125273 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "screens",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "icon",
            type: "varchar",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("screens");
  }
}
