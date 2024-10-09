import { idColumn, timestampColumn } from "@hedhog/utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Migrate1728432828551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "persons",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "type_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "birth_at",
            type: "date",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "person_types",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "50",
            isUnique: true,
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
      true,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("person_types", ["name"])
      .values([
        {
          name: "Física",
        },
        {
          name: "Jurídica",
        },
        {
          name: "Internacional",
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "person_document_types",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "63",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("person_document_types", ["name"])
      .values([
        {
          name: "RG",
        },
        {
          name: "CPF",
        },
        {
          name: "CNPJ",
        },
        {
          name: "Passaporte",
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "person_documents",
        columns: [
          idColumn(),
          {
            name: "person_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "type_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "primary",
            type: "boolean",
            default: false,
          },
          {
            name: "value",
            type: "varchar",
            length: "63",
            isNullable: false,
          },
          {
            name: "country_id",
            type: "int",
            unsigned: true,
            isNullable: true,
          },
          {
            name: "issued_at",
            type: "date",
            isNullable: true,
          },
          {
            name: "expiry_at",
            type: "date",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        uniques: [
          {
            name: "UQ_person_document",
            columnNames: ["person_id", "type_id", "value"],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "person_contact_types",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "63",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("person_contact_types", ["name"])
      .values([
        {
          name: "Telefone",
        },
        {
          name: "Email",
        },
        {
          name: "Fax",
        },
        {
          name: "WhatsApp",
        },
        {
          name: "Telegram",
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "person_contacts",
        columns: [
          idColumn(),
          {
            name: "person_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "type_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "primary",
            type: "boolean",
            default: false,
          },
          {
            name: "value",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        uniques: [
          {
            name: "UQ_person_contact",
            columnNames: ["person_id", "type_id", "value"],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "person_addresses",
        columns: [
          idColumn(),
          {
            name: "person_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "country_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "primary",
            type: "boolean",
            default: false,
          },
          {
            name: "street",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "number",
            type: "int",
            isNullable: true,
          },
          {
            name: "complement",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "district",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "postal_code",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "reference",
            type: "varchar",
            length: "60",
            isNullable: true,
          },
          {
            name: "type_id",
            type: "int",
            unsigned: true,
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
        name: "person_address_types",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "31",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("person_address_types", ["name"])
      .values([
        {
          name: "Residencial",
        },
        {
          name: "Comercial",
        },
        {
          name: "Correspondência",
        },
        {
          name: "Alternativo",
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: "person_customs",
        columns: [
          idColumn(),
          {
            name: "person_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "type_id",
            type: "int",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "value",
            type: "text",
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
        uniques: [
          {
            name: "UQ_person_customs",
            columnNames: ["person_id", "name"],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "person_custom_types",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
            length: "31",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("person_custom_types", ["name"])
      .values([{ name: "Preferred Language" }]);

    await queryRunner.createForeignKeys("person_documents", [
      new TableForeignKey({
        columnNames: ["person_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "persons",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "person_document_types",
        onDelete: "RESTRICT",
      }),
      new TableForeignKey({
        columnNames: ["country_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "countries",
        onDelete: "SET NULL",
      }),
    ]);

    await queryRunner.createForeignKeys("person_contacts", [
      new TableForeignKey({
        columnNames: ["person_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "persons",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "person_contact_types",
        onDelete: "RESTRICT",
      }),
    ]);

    await queryRunner.createForeignKeys("person_addresses", [
      new TableForeignKey({
        columnNames: ["person_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "persons",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["country_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "countries",
        onDelete: "RESTRICT",
      }),
    ]);

    await queryRunner.createForeignKeys("person_customs", [
      new TableForeignKey({
        columnNames: ["person_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "persons",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "person_custom_types",
        onDelete: "RESTRICT",
      }),
    ]);

    const managementResult = await queryRunner.manager
      .createQueryBuilder()
      .select("m.id")
      .from("menus", "m")
      .where("m.url = :url", { url: "/management" })
      .execute();

    const managementId = managementResult ? managementResult[0].id : null;

    const menuContacts = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("menus", ["url", "order", "menu_id", "icon"])
      .values({
        url: null,
        order: 3,
        menu_id: null,
        icon: "user-check",
      })
      .returning("id")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("menu_translations", ["name", "locale_id", "menu_id"])
      .values([
        {
          name: "Contacts",
          locale_id: 1,
          menu_id: menuContacts.raw[0].id,
        },
        {
          name: "Contatos",
          locale_id: 2,
          menu_id: menuContacts.raw[0].id,
        },
      ])
      .execute();

    const menuManagementPersons = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("menus", ["url", "order", "menu_id", "icon"])
      .values({
        url: null,
        order: 6,
        menu_id: managementId,
        icon: "user-check",
      })
      .returning("id")
      .execute();

    const personsMenuId = menuManagementPersons.raw[0].id;

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("menu_translations", ["name", "locale_id", "menu_id"])
      .values([
        {
          name: "Persons",
          locale_id: 1,
          menu_id: personsMenuId,
        },
        {
          name: "Pessoas",
          locale_id: 2,
          menu_id: personsMenuId,
        },
      ])
      .execute();

    const menuInsertions = [
      {
        name_en: "Address Types",
        name_pt: "Tipos de Endereço",
        url: "/management/persons/address-types",
        order: 0,
        menu_id: personsMenuId,
        icon: "home-link",
      },
      {
        name_en: "Contact Types",
        name_pt: "Tipos de Contato",
        url: "/management/persons/contact-types",
        order: 1,
        menu_id: personsMenuId,
        icon: "address-book",
      },
      {
        name_en: "Custom Types",
        name_pt: "Tipos Personalizados",
        url: "/management/persons/custom-types",
        order: 2,
        menu_id: personsMenuId,
        icon: "adjustments",
      },
      {
        name_en: "Document Types",
        name_pt: "Tipos de Documentos",
        url: "/management/persons/document-types",
        order: 3,
        menu_id: personsMenuId,
        icon: "file-search",
      },
      {
        name_en: "Person Types",
        name_pt: "Tipos de Pessoa",
        url: "/management/persons/person-types",
        order: 4,
        menu_id: personsMenuId,
        icon: "id",
      },
    ];

    const ids = [];
    for (const menu of menuInsertions) {
      const menuResult = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("menus", ["url", "order", "menu_id", "icon"])
        .values({
          url: menu.url,
          order: menu.order,
          menu_id: menu.menu_id,
          icon: menu.icon,
        })
        .returning("id")
        .execute();

      const menuId = menuResult.raw[0].id;

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("menu_translations", ["name", "locale_id", "menu_id"])
        .values([
          {
            name: menu.name_en,
            locale_id: 1,
            menu_id: menuId,
          },
          {
            name: menu.name_pt,
            locale_id: 2,
            menu_id: menuId,
          },
        ])
        .execute();

      ids.push(menuId);
    }

    for (const id of [...ids, personsMenuId]) {
      if (id) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into("role_menus")
          .values({
            role_id: 1,
            menu_id: id,
          })
          .execute();
      }
    }

    const screens = [
      {
        name_en: "Contacts",
        description_en: "Check all persons registered in the system.",
        name_pt: "Contatos",
        description_pt: "Verifique todas as pessoas registradas no sistema.",
        slug: "/persons",
        icon: "user-check",
      },
      {
        name_en: "Address Types",
        description_en: "Check all types of address registered in the system.",
        name_pt: "Tipos de Endereço",
        description_pt:
          "Verifique todos os tipos de endereço registrados no sistema.",
        slug: "/management/persons/address-types",
        icon: "home-link",
      },
      {
        name_en: "Contact Types",
        description_en: "Check all types of contacts registered in the system.",
        name_pt: "Tipos de Contato",
        description_pt:
          "Verifique todos os tipos de contato registrados no sistema.",
        slug: "/management/persons/contact-types",
        icon: "address-book",
      },
      {
        name_en: "Custom Types",
        description_en: "Check all custom types registered in the system.",
        name_pt: "Tipos Personalizados",
        description_pt:
          "Verifique todos os tipos personalizados registrados no sistema.",
        slug: "/management/persons/custom-types",
        icon: "adjustments",
      },
      {
        name_en: "Document Types",
        description_en:
          "Check all types of documents registered in the system.",
        name_pt: "Tipos de Documentos",
        description_pt:
          "Verifique todos os tipos de documentos registrados no sistema.",
        slug: "/management/persons/document-types",
        icon: "file-search",
      },
      {
        name_en: "Person Types",
        description_en: "Check all types of persons registered in the system.",
        name_pt: "Tipos de Pessoa",
        description_pt:
          "Verifique todos os tipos de pessoa registrados no sistema.",
        slug: "/management/persons/person-types",
        icon: "id",
      },
    ];

    for (const screen of screens) {
      const s = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("screens", ["slug", "icon"])
        .values({
          slug: screen.slug,
          icon: screen.icon,
        })
        .returning("id")
        .execute();

      const screenId = s.raw[0].id;

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("role_screens")
        .values({
          role_id: 1,
          screen_id: screenId,
        });

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("screen_translations", [
          "name",
          "description",
          "locale_id",
          "screen_id",
        ])
        .values([
          {
            name: screen.name_en,
            description: screen.description_en,
            locale_id: 1,
            screen_id: screenId,
          },
          {
            name: screen.name_pt,
            description: screen.description_pt,
            locale_id: 2,
            screen_id: screenId,
          },
        ])
        .execute();
    }

    const results = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("routes", ["url", "method"])
      .values([
        {
          url: "/persons",
          method: "GET",
        },
        {
          url: "/persons",
          method: "POST",
        },
        {
          url: "/persons",
          method: "DELETE",
        },
        {
          url: "/persons/:personId",
          method: "GET",
        },
        {
          url: "/persons/:personId",
          method: "PATCH",
        },
        {
          url: "/person-types",
          method: "GET",
        },
        {
          url: "/person-types",
          method: "POST",
        },
        {
          url: "/person-types",
          method: "DELETE",
        },
        {
          url: "/person-types/:personTypeId",
          method: "GET",
        },
        {
          url: "/person-types/:personTypeId",
          method: "PATCH",
        },
        {
          url: "/address-types",
          method: "GET",
        },
        {
          url: "/address-types",
          method: "POST",
        },
        {
          url: "/address-types",
          method: "DELETE",
        },
        {
          url: "/address-types/:addressTypeId",
          method: "GET",
        },
        {
          url: "/address-types/:addressTypeId",
          method: "PATCH",
        },
        {
          url: "/contact-types",
          method: "GET",
        },
        {
          url: "/contact-types",
          method: "POST",
        },
        {
          url: "/contact-types",
          method: "DELETE",
        },
        {
          url: "/contact-types/:contactTypeId",
          method: "GET",
        },
        {
          url: "/contact-types/:contactTypeId",
          method: "PATCH",
        },
        {
          url: "/custom-types",
          method: "GET",
        },
        {
          url: "/custom-types",
          method: "POST",
        },
        {
          url: "/custom-types",
          method: "DELETE",
        },
        {
          url: "/custom-types/:customTypeId",
          method: "GET",
        },
        {
          url: "/custom-types/:customTypeId",
          method: "PATCH",
        },
        {
          url: "/document-types",
          method: "GET",
        },
        {
          url: "/document-types",
          method: "POST",
        },
        {
          url: "/document-types",
          method: "DELETE",
        },
        {
          url: "/document-types/:documentTypeId",
          method: "GET",
        },
        {
          url: "/document-types/:documentTypeId",
          method: "PATCH",
        },
      ])
      .returning("id")
      .execute();

    const roleRouteValues = results.raw.map((result) => ({
      role_id: 1,
      route_id: result.id,
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("role_routes")
      .values(roleRouteValues)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("person_custom_types");
    await queryRunner.dropTable("person_customs");
    await queryRunner.dropTable("person_address_types");
    await queryRunner.dropTable("person_addresses");
    await queryRunner.dropTable("person_contacts");
    await queryRunner.dropTable("person_contact_types");
    await queryRunner.dropTable("person_documents");
    await queryRunner.dropTable("person_document_types");
    await queryRunner.dropTable("person_types");
    await queryRunner.dropTable("persons");
    await queryRunner.dropTable("countries");
  }
}
