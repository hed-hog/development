import { timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1727197435452 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "role_screens",
        columns: [
          {
            name: "role_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "screen_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createForeignKeys("role_screens", [
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
        name: "fk_role_screens_roles",
      }),
      new TableForeignKey({
        columnNames: ["screen_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "screens",
        onDelete: "CASCADE",
        name: "fk_role_screens_screens",
      }),
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("role_screens");
  }
}
