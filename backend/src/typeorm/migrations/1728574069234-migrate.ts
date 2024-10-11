import { idColumn, timestampColumn } from "@hedhog/utils";

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1728574069234 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "screens",
        columns: [
          idColumn(),
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
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

    await queryRunner.createTable(
      new Table({
        name: "screen_translations",
        columns: [
          {
            name: "screen_id",
            type: "int",
            unsigned: true,
            isPrimary: true,
          },
          {
            name: "locale_id",
            type: "int",
            unsigned: true,
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["screen_id"],
            referencedTableName: "screens",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            columnNames: ["locale_id"],
            referencedTableName: "locales",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          }),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("screens", ["slug", "icon"])
      .values([
        {
          slug: "/management/users",
          icon: "users",
        },
        {
          slug: "/management/roles",
          icon: "circles",
        },
        {
          slug: "/management/screens",
          icon: "monitor",
        },
        {
          slug: "/management/menus",
          icon: "menu",
        },
        {
          slug: "/management/routes",
          icon: "route",
        },
        {
          slug: "/management/settings",
          icon: "settings",
        },
      ])
      .execute();

    const screenUsers = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/users" })
      .execute();
    const screenRoles = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/roles" })
      .execute();
    const screenScreens = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/screens" })
      .execute();
    const screenMenus = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/menus" })
      .execute();
    const screenRoutes = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/routes" })
      .execute();
    const screenSettings = await queryRunner.manager
      .createQueryBuilder()
      .select("id")
      .from("screens", "s")
      .where("s.slug = :slug", { slug: "/management/settings" })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("screen_translations", [
        "screen_id",
        "locale_id",
        "name",
        "description",
      ])
      .values([
        {
          screen_id: screenUsers[0].id,
          locale_id: 1,
          name: "Users",
          description: "Check all users registered in the system.",
        },
        {
          screen_id: screenUsers[0].id,
          locale_id: 2,
          name: "Usuários",
          description: "Verifique todos os usuários registrados no sistema.",
        },
        {
          screen_id: screenRoles[0].id,
          locale_id: 1,
          name: "Roles",
          description: "Check all roles registered in the system.",
        },
        {
          screen_id: screenRoles[0].id,
          locale_id: 2,
          name: "Funções",
          description: "Verifique todas as funções registradas no sistema.",
        },
        {
          screen_id: screenScreens[0].id,
          locale_id: 1,
          name: "Screens",
          description: "Check all screens registered in the system.",
        },
        {
          screen_id: screenScreens[0].id,
          locale_id: 2,
          name: "Telas",
          description: "Verifique todas as telas registradas no sistema.",
        },
        {
          screen_id: screenMenus[0].id,
          locale_id: 1,
          name: "Menus",
          description: "Check all menus registered in the system.",
        },
        {
          screen_id: screenMenus[0].id,
          locale_id: 2,
          name: "Menus",
          description: "Verifique todos os menus registrados no sistema.",
        },
        {
          screen_id: screenRoutes[0].id,
          locale_id: 1,
          name: "Routes",
          description: "Check all routes registered in the system.",
        },
        {
          screen_id: screenRoutes[0].id,
          locale_id: 2,
          name: "Rotas",
          description: "Verifique todas as rotas registradas no sistema.",
        },
        {
          screen_id: screenSettings[0].id,
          locale_id: 1,
          name: "Settings",
          description: "Check all settings registered in the system.",
        },
        {
          screen_id: screenSettings[0].id,
          locale_id: 2,
          name: "Configurações",
          description:
            "Verifique todas as configurações registradas no sistema.",
        },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("screens");
  }
}
