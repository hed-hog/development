import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { idColumn, timestampColumn } from "@hedhog/utils";

export class Migrate1728407704453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "settings",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "setting_values",
        columns: [
          idColumn(),
          {
            name: "value",
            type: "varchar",
            length: "1023",
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "label",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "setting_id",
            type: "int",
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    // Criação das foreign keys
    await queryRunner.createForeignKey(
      "setting_values",
      new TableForeignKey({
        columnNames: ["setting_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "settings",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("setting_values");
    await queryRunner.dropTable("settings");
  }
}
