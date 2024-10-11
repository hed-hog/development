import { idColumn, timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1728574069290 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [idColumn(), timestampColumn(), timestampColumn("updated_at")],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "role_translations",
        columns: [
          {
            name: "role_id",
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
            isNullable: false,
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
            columnNames: ["role_id"],
            referencedTableName: "roles",
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

    const roles = [
      {
        id: 1,
        name_en: "Administrator",
        name_pt: "Administrador",
        description_en: "System administrator",
        description_pt: "Administrador do sistema",
      },
      {
        id: 2,
        name_en: "Screen Manager",
        name_pt: "Gerenciador de telas",
        description_en: "Screen manager",
        description_pt: "Gerenciador de telas",
      },
    ];

    for (const role of roles) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("roles", ["id"])
        .values({
          id: role.id,
        })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("role_translations", [
          "role_id",
          "locale_id",
          "name",
          "description",
        ])
        .values([
          {
            role_id: role.id,
            locale_id: 1,
            name: role.name_en,
            description: role.description_en,
          },
          {
            role_id: role.id,
            locale_id: 2,
            name: role.name_pt,
            description: role.description_pt,
          },
        ])
        .execute();
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("roles");
  }
}
