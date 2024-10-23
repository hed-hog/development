import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { foreignColumn, idColumn, timestampColumn } from "@hedhog/utils";
import { Menu } from "../entities";

export class Migrate1729608504801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "menus",
        columns: [
          idColumn(),
          foreignColumn({ name: "menu_id", isNullable: true }),
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "order",
            type: "int",
            default: 0,
            unsigned: true,
          },
          {
            name: "icon",
            type: "varchar",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        indices: [{ columnNames: ["slug"], isUnique: true }],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "menu_translations",
        columns: [
          foreignColumn({ name: "menu_id", isPrimary: true }),
          foreignColumn({ name: "locale_id", isPrimary: true }),
          {
            name: "name",
            type: "varchar",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["menu_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "menus",
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            columnNames: ["locale_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "locales",
            onDelete: "CASCADE",
          }),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "menu_screens",
        columns: [
          foreignColumn({ name: "menu_id", isPrimary: true }),
          foreignColumn({ name: "screen_id", isPrimary: true }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "menu_screens",
      new TableForeignKey({
        columnNames: ["menu_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "menus",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "menu_screens",
      new TableForeignKey({
        columnNames: ["screen_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "screens",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("menu_screens");
    await queryRunner.dropTable("menus");
  }
}
