import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { idColumn, timestampColumn, foreignColumn } from "@hedhog/utils";

export class Migrate1729608504697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "countries",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "code",
            type: "char",
            length: "3",
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "locales",
        columns: [
          idColumn(),
          foreignColumn({ name: "country_id" }),
          {
            name: "code",
            type: "char",
            length: "2",
            isNullable: false,
          },
          {
            name: "region",
            type: "char",
            length: "2",
            isNullable: false,
          },
          {
            name: "enabled",
            type: "boolean",
            default: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        foreignKeys: [
          {
            columnNames: ["country_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "countries",
            onDelete: "CASCADE",
          },
        ],
      }),
    );

    const countryUSA = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("countries", "c")
      .where("code = :code", { code: "USA" })
      .execute();
    const countryBRA = await queryRunner.manager
      .createQueryBuilder()
      .select()
      .from("countries", "c")
      .where("code = :code", { code: "BRA" })
      .execute();

    const locales = [
      {
        id: 0,
        code: "en",
        region: "US",
        country_id: countryUSA[0].id,
      },
      {
        id: 0,
        code: "pt",
        region: "BR",
        country_id: countryBRA[0].id,
      },
    ];

    for (let index = 0; index < locales.length; index++) {
      const localeId = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("locales", ["code", "region", "country_id"])
        .values({
          code: locales[index].code,
          region: locales[index].region,
          country_id: locales[index].country_id,
        })
        .execute();

      locales[index].id = localeId.raw.insertId;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("locales");
  }
}
