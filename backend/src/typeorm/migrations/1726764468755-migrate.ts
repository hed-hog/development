import { idColumn, timestampColumn } from "@hedhog/utils";

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from "typeorm";

export class Migrate1726764468755 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "routes",
        columns: [
          idColumn(),
          {
            name: "url",
            type: "varchar",
          },
          {
            name: "method",
            type: "enum",
            enum: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"],
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      "routes",
      new TableUnique({
        columnNames: ["url", "method"],
        name: "unique_routes",
      }),
    );

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

    await queryRunner.manager.query(
      `INSERT INTO routes (url, method) VALUES
      ('/auth/verify', 'GET'),
      ('/menus', 'GET'),
      ('/menus/system', 'GET'),
      ('/menus/:menuId', 'GET'),
      ('/menus', 'POST'),
      ('/menus/:menuId', 'PATCH'),
      ('/menus', 'DELETE'),
      ('/menus/order', 'PATCH'),
      ('/permissions', 'GET'),
      ('/permissions/:permissionId', 'GET'),
      ('/permissions', 'POST'),
      ('/permissions/:permissionId', 'PATCH'),
      ('/permissions', 'DELETE'),
      ('/screens', 'GET'),
      ('/screens/:screenId', 'GET'),
      ('/screens', 'POST'),
      ('/screens/:screenId', 'PATCH'),
      ('/screens', 'DELETE'),
      ('/settings', 'GET'),
      ('/settings/:settingId', 'GET'),
      ('/settings', 'POST'),
      ('/settings/:settingId', 'PATCH'),
      ('/settings', 'DELETE'),
      ('/users', 'GET'),
      ('/users/:userId', 'GET'),
      ('/users', 'POST'),
      ('/users/:userId', 'PATCH'),
      ('/users', 'DELETE');
    `,
    );

    await queryRunner.manager.query(
      `INSERT INTO roles (id, name, description) VALUES
      (1, 'Administrator', 'System administrator');`,
    );

    const routes = await queryRunner.manager.query("SELECT id FROM routes");

    for (const route of routes) {
      await queryRunner.manager.query(
        `INSERT INTO role_routes (role_id, route_id) VALUES(${1}, ${route.id});`,
      );
    }
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("role_routes");
    await queryRunner.dropTable("roles");
    await queryRunner.dropTable("role_screens");
    await queryRunner.dropTable("role_users");
    await queryRunner.dropTable("routes");
  }
}
