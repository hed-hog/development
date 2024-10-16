import { timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1729100057479 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "role_routes",
        columns: [
          {
            name: "role_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "route_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createForeignKeys("role_routes", [
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
        name: "fk_role_routes_roles",
      }),
      new TableForeignKey({
        columnNames: ["route_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "routes",
        onDelete: "CASCADE",
        name: "fk_role_routes_routes",
      }),
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("role_routes");
  }
}
