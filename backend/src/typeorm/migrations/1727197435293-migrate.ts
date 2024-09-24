import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { idColumn, timestampColumn } from "@hedhog/utils";
import * as bcrypt from "bcrypt";

export class Migrate1727197435293 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "multifactors",
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

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("multifactors", ["name"])
      .values([
        {
          name: "Email",
        },
        {
          name: "Applicativo",
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "multifactor_id",
            type: "int",
            isNullable: true,
            unsigned: true,
          },
          {
            name: "code",
            type: "varchar",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.createForeignKeys("users", [
      new TableForeignKey({
        columnNames: ["multifactor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "multifactors",
        name: "fk_users_to_multifactors_on_multifactor_id",
        onDelete: "Cascade",
      }),
    ]);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("users", ["name", "email", "password"])
      .values([
        {
          name: "Superuser",
          email: "root@hedhog.com",
          password: await bcrypt.hash(`hedhog`, 12),
        },
        {
          name: "User",
          email: "user@hedhog.com",
          password: await bcrypt.hash(`hedhog`, 12),
        },
      ])
      .execute();
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("multifactors");
    await queryRunner.dropTable("users");
  }
}
