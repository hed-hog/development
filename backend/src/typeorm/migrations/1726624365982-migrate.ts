import { idColumn, timestampColumn } from "@hedhog/utils";

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1726624365982 implements MigrationInterface {
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
        name: "fk_role_screens_screen",
      }),
    ]);

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
        name: "fk_role_users_user",
      }),
    ]);

    await queryRunner.query(
      `INSERT INTO roles (id, name, description) VALUES
      (1, 'Administrator', 'System administrator');`,
    );
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("roles");
    await queryRunner.dropTable("role_screens");
    await queryRunner.dropTable("role_users");
  }
}
