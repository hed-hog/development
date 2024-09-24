import { idColumn, timestampColumn } from "@hedhog/utils";

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1727197435336 implements MigrationInterface {
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("screens", ["name", "slug", "description", "icon"])
      .values([
        {
          name: "Users",
          slug: "/management/users",
          description: "Check all users registered in the system.",
          icon: "users",
        },
        {
          name: "Roles",
          slug: "/management/roles",
          description: "Check all roles registered in the system.",
          icon: "circles",
        },
        {
          name: "Screens",
          slug: "/management/screens",
          description: "Check all screens registered in the system.",
          icon: "monitor",
        },
        {
          name: "Menus",
          slug: "/management/menus",
          description: "Check all menus registered in the system.",
          icon: "menu",
        },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("screens");
  }
}