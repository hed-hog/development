import { timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1729100057472 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "role_users",
        columns: [
          {
            name: "role_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "user_id",
            type: "int",
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createForeignKeys("role_users", [
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
        name: "fk_role_users_roles",
      }),

      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        name: "fk_role_users_users",
      }),
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("role_users");
  }
}
