import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { idColumn, timestampColumn } from "@hedhog/utils";

export class Migrate1728497432801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.createTable(
      new Table({
        name: "translation_namespaces",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
      true,
    );

    await await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("translation_namespaces")
      .values([{ name: "translation" }])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "translations",
        columns: [
          idColumn(),
          {
            name: "locale_id",
            type: "int",
            isNullable: false,
            unsigned: true,
          },
          {
            name: "namespace_id",
            type: "int",
            isNullable: false,
            unsigned: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "value",
            type: "varchar",
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        uniques: [
          {
            columnNames: ["locale_id", "namespace_id", "name"],
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["locale_id"],
            referencedTableName: "locales",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            columnNames: ["namespace_id"],
            referencedTableName: "translation_namespaces",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          }),
        ],
      }),
      true,
    );

    await await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("translations", ["locale_id", "namespace_id", "name", "value"])
      .values([
        {
          locale_id: 1,
          namespace_id: 1,
          name: "slogan",
          value: "Administration Panel",
        },
        {
          locale_id: 1,
          namespace_id: 1,
          name: "en",
          value: "English",
        },
        {
          locale_id: 1,
          namespace_id: 1,
          name: "pt",
          value: "Portuguese",
        },
        {
          locale_id: 2,
          namespace_id: 1,
          name: "slogan",
          value: "Painel de Administração",
        },
        {
          locale_id: 2,
          namespace_id: 1,
          name: "en",
          value: "Inglês",
        },
        {
          locale_id: 2,
          namespace_id: 1,
          name: "pt",
          value: "Português",
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("translations");
    await queryRunner.dropTable("translation_namespaces");
  }
}