import { foreignColumn, timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1729608504866 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "role_routes",
        columns: [
          foreignColumn({ name: "role_id", isPrimary: true }),
          foreignColumn({ name: "route_id", isPrimary: true }),
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
