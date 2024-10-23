import { foreignColumn, idColumn, timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1729608504827 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          idColumn(),
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "role_translations",
        columns: [
          foreignColumn({ name: "role_id", isPrimary: true }),
          foreignColumn({ name: "locale_id", isPrimary: true }),
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
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("roles");
  }
}
