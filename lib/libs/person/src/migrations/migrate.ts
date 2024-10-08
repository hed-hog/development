import { idColumn, timestampColumn } from '@hedhog/utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrate implements MigrationInterface {
  private async insertMenu(
    queryRunner: QueryRunner,
    name: string,
    url: string,
    order: number,
    menuId: number,
    icon: string,
  ) {
    const result = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menus')
      .values({
        name,
        url,
        order,
        menu_id: menuId,
        icon,
      })
      .returning('id')
      .execute();

    return result.raw[0].id;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'birth_at',
            type: 'date',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_types',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person_types', ['name'])
      .values([
        {
          name: 'Física',
        },
        {
          name: 'Jurídica',
        },
        {
          name: 'Internacional',
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'person_document_types',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person_document_types', ['name'])
      .values([
        {
          name: 'RG',
        },
        {
          name: 'CPF',
        },
        {
          name: 'CNPJ',
        },
        {
          name: 'Passaporte',
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'char',
            length: '3',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.query(`
      INSERT INTO countries (name, code) VALUES 
        ('Afghanistan', 'AFG'),
        ('Albania', 'ALB'),
        ('Algeria', 'DZA'),
        ('Andorra', 'AND'),
        ('Angola', 'AGO'),
        ('Antigua and Barbuda', 'ATG'),
        ('Argentina', 'ARG'),
        ('Armenia', 'ARM'),
        ('Australia', 'AUS'),
        ('Austria', 'AUT'),
        ('Azerbaijan', 'AZE'),
        ('Bahamas', 'BHS'),
        ('Bahrain', 'BHR'),
        ('Bangladesh', 'BGD'),
        ('Barbados', 'BRB'),
        ('Belarus', 'BLR'),
        ('Belgium', 'BEL'),
        ('Belize', 'BLZ'),
        ('Benin', 'BEN'),
        ('Bhutan', 'BTN'),
        ('Bolivia', 'BOL'),
        ('Bosnia and Herzegovina', 'BIH'),
        ('Botswana', 'BWA'),
        ('Brazil', 'BRA'),
        ('Brunei Darussalam', 'BRN'),
        ('Bulgaria', 'BGR'),
        ('Burkina Faso', 'BFA'),
        ('Burundi', 'BDI'),
        ('Cabo Verde', 'CPV'),
        ('Cambodia', 'KHM'),
        ('Cameroon', 'CMR'),
        ('Canada', 'CAN'),
        ('Central African Republic', 'CAF'),
        ('Chad', 'TCD'),
        ('Chile', 'CHL'),
        ('China', 'CHN'),
        ('Colombia', 'COL'),
        ('Comoros', 'COM'),
        ('Congo', 'COG'),
        ('Congo (Democratic Republic)', 'COD'),
        ('Costa Rica', 'CRI'),
        ('Croatia', 'HRV'),
        ('Cuba', 'CUB'),
        ('Cyprus', 'CYP'),
        ('Czech Republic', 'CZE'),
        ('Denmark', 'DNK'),
        ('Djibouti', 'DJI'),
        ('Dominica', 'DMA'),
        ('Dominican Republic', 'DOM'),
        ('Ecuador', 'ECU'),
        ('Egypt', 'EGY'),
        ('El Salvador', 'SLV'),
        ('Equatorial Guinea', 'GNQ'),
        ('Eritrea', 'ERI'),
        ('Estonia', 'EST'),
        ('Eswatini', 'SWZ'),
        ('Ethiopia', 'ETH'),
        ('Fiji', 'FJI'),
        ('Finland', 'FIN'),
        ('France', 'FRA'),
        ('Gabon', 'GAB'),
        ('Gambia', 'GMB'),
        ('Georgia', 'GEO'),
        ('Germany', 'DEU'),
        ('Ghana', 'GHA'),
        ('Greece', 'GRC'),
        ('Grenada', 'GRD'),
        ('Guatemala', 'GTM'),
        ('Guinea', 'GIN'),
        ('Guinea-Bissau', 'GNB'),
        ('Guyana', 'GUY'),
        ('Haiti', 'HTI'),
        ('Honduras', 'HND'),
        ('Hungary', 'HUN'),
        ('Iceland', 'ISL'),
        ('India', 'IND'),
        ('Indonesia', 'IDN'),
        ('Iran', 'IRN'),
        ('Iraq', 'IRQ'),
        ('Ireland', 'IRL'),
        ('Israel', 'ISR'),
        ('Italy', 'ITA'),
        ('Jamaica', 'JAM'),
        ('Japan', 'JPN'),
        ('Jordan', 'JOR'),
        ('Kazakhstan', 'KAZ'),
        ('Kenya', 'KEN'),
        ('Kiribati', 'KIR'),
        ('Kuwait', 'KWT'),
        ('Kyrgyzstan', 'KGZ'),
        ('Laos', 'LAO'),
        ('Latvia', 'LVA'),
        ('Lebanon', 'LBN'),
        ('Lesotho', 'LSO'),
        ('Liberia', 'LBR'),
        ('Libya', 'LBY'),
        ('Liechtenstein', 'LIE'),
        ('Lithuania', 'LTU'),
        ('Luxembourg', 'LUX'),
        ('Madagascar', 'MDG'),
        ('Malawi', 'MWI'),
        ('Malaysia', 'MYS'),
        ('Maldives', 'MDV'),
        ('Mali', 'MLI'),
        ('Malta', 'MLT'),
        ('Marshall Islands', 'MHL'),
        ('Mauritania', 'MRT'),
        ('Mauritius', 'MUS'),
        ('Mexico', 'MEX'),
        ('Micronesia (Federated States)', 'FSM'),
        ('Moldova', 'MDA'),
        ('Monaco', 'MCO'),
        ('Mongolia', 'MNG'),
        ('Montenegro', 'MNE'),
        ('Morocco', 'MAR'),
        ('Mozambique', 'MOZ'),
        ('Myanmar', 'MMR'),
        ('Namibia', 'NAM'),
        ('Nauru', 'NRU'),
        ('Nepal', 'NPL'),
        ('Netherlands', 'NLD'),
        ('New Zealand', 'NZL'),
        ('Nicaragua', 'NIC'),
        ('Niger', 'NER'),
        ('Nigeria', 'NGA'),
        ('North Macedonia', 'MKD'),
        ('Norway', 'NOR'),
        ('Oman', 'OMN'),
        ('Pakistan', 'PAK'),
        ('Palau', 'PLW'),
        ('Panama', 'PAN'),
        ('Papua New Guinea', 'PNG'),
        ('Paraguay', 'PRY'),
        ('Peru', 'PER'),
        ('Philippines', 'PHL'),
        ('Poland', 'POL'),
        ('Portugal', 'PRT'),
        ('Qatar', 'QAT'),
        ('Republic of Korea', 'KOR'),
        ('Romania', 'ROU'),
        ('Russian Federation', 'RUS'),
        ('Rwanda', 'RWA'),
        ('Saint Kitts and Nevis', 'KNA'),
        ('Saint Lucia', 'LCA'),
        ('Saint Vincent and the Grenadines', 'VCT'),
        ('Samoa', 'WSM'),
        ('San Marino', 'SMR'),
        ('Sao Tome and Principe', 'STP'),
        ('Saudi Arabia', 'SAU'),
        ('Senegal', 'SEN'),
        ('Serbia', 'SRB'),
        ('Seychelles', 'SYC'),
        ('Sierra Leone', 'SLE'),
        ('Singapore', 'SGP'),
        ('Slovakia', 'SVK'),
        ('Slovenia', 'SVN'),
        ('Solomon Islands', 'SLB'),
        ('Somalia', 'SOM'),
        ('South Africa', 'ZAF'),
        ('Spain', 'ESP'),
        ('Sri Lanka', 'LKA'),
        ('Sudan', 'SDN'),
        ('Suriname', 'SUR'),
        ('Sweden', 'SWE'),
        ('Switzerland', 'CHE'),
        ('Syrian Arab Republic', 'SYR'),
        ('Tajikistan', 'TJK'),
        ('Thailand', 'THA'),
        ('Timor-Leste', 'TLS'),
        ('Togo', 'TGO'),
        ('Tonga', 'TON'),
        ('Trinidad and Tobago', 'TTO'),
        ('Tunisia', 'TUN'),
        ('Turkey', 'TUR'),
        ('Turkmenistan', 'TKM'),
        ('Tuvalu', 'TUV'),
        ('Uganda', 'UGA'),
        ('Ukraine', 'UKR'),
        ('United Arab Emirates', 'ARE'),
        ('United Kingdom', 'GBR'),
        ('United Republic of Tanzania', 'TZA'),
        ('United States of America', 'USA'),
        ('Uruguay', 'URY'),
        ('Uzbekistan', 'UZB'),
        ('Vanuatu', 'VUT'),
        ('Venezuela', 'VEN'),
        ('Viet Nam', 'VNM'),
        ('Yemen', 'YEM'),
        ('Zambia', 'ZMB'),
        ('Zimbabwe', 'ZWE');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'person_documents',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'primary',
            type: 'boolean',
            default: false,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '63',
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'int',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'issued_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'expiry_at',
            type: 'date',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        uniques: [
          {
            name: 'UQ_person_document',
            columnNames: ['person_id', 'type_id', 'value'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_contact_types',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person_contact_types', ['name'])
      .values([
        {
          name: 'Telefone',
        },
        {
          name: 'Email',
        },
        {
          name: 'Fax',
        },
        {
          name: 'WhatsApp',
        },
        {
          name: 'Telegram',
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'person_contacts',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'primary',
            type: 'boolean',
            default: false,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        uniques: [
          {
            name: 'UQ_person_contact',
            columnNames: ['person_id', 'type_id', 'value'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_addresses',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'country_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'primary',
            type: 'boolean',
            default: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'reference',
            type: 'varchar',
            length: '60',
            isNullable: true,
          },
          {
            name: 'type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_address_types',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '31',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person_address_types', ['name'])
      .values([
        {
          name: 'Residencial',
        },
        {
          name: 'Comercial',
        },
        {
          name: 'Correspondência',
        },
        {
          name: 'Alternativo',
        },
      ])
      .execute();

    await queryRunner.createTable(
      new Table({
        name: 'person_customs',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'text',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        uniques: [
          {
            name: 'UQ_person_customs',
            columnNames: ['person_id', 'name'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_custom_types',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '31',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person_custom_types', ['name'])
      .values([{ name: 'Preferred Language' }]);

    await queryRunner.createForeignKeys('person_documents', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'person_document_types',
        onDelete: 'RESTRICT',
      }),
      new TableForeignKey({
        columnNames: ['country_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'countries',
        onDelete: 'SET NULL',
      }),
    ]);

    await queryRunner.createForeignKeys('person_contacts', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'person_contact_types',
        onDelete: 'RESTRICT',
      }),
    ]);

    await queryRunner.createForeignKeys('person_addresses', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['country_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'countries',
        onDelete: 'RESTRICT',
      }),
    ]);

    await queryRunner.createForeignKeys('person_customs', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'person_custom_types',
        onDelete: 'RESTRICT',
      }),
    ]);

    const managementResult = await queryRunner.manager
      .createQueryBuilder()
      .select('m.id')
      .from('menus', 'm')
      .where('m.url = :url', { url: '/management' })
      .execute();

    const managementId = managementResult ? managementResult[0].id : null;

    const personsMenuId = await this.insertMenu(
      queryRunner,
      'Persons',
      null,
      6,
      managementId,
      'user-check',
    );

    const menuInsertions = [
      {
        name: 'Persons',
        url: '/persons',
        order: 2,
        parentId: null,
        icon: 'user-check',
      },
      {
        name: 'Address Types',
        url: '/management/persons/address-types',
        order: 0,
        parentId: personsMenuId,
        icon: 'home-link',
      },
      {
        name: 'Contact Types',
        url: '/management/persons/contact-types',
        order: 1,
        parentId: personsMenuId,
        icon: 'address-book',
      },
      {
        name: 'Custom Types',
        url: '/management/persons/custom-types',
        order: 2,
        parentId: personsMenuId,
        icon: 'adjustments',
      },
      {
        name: 'Document Types',
        url: '/management/persons/document-types',
        order: 3,
        parentId: personsMenuId,
        icon: 'file-search',
      },
      {
        name: 'Person Types',
        url: '/management/persons/person-types',
        order: 4,
        parentId: personsMenuId,
        icon: 'id',
      },
    ];

    const ids = [];
    for (const menu of menuInsertions) {
      const menuId = await this.insertMenu(
        queryRunner,
        menu.name,
        menu.url,
        menu.order,
        menu.parentId,
        menu.icon,
      );

      ids.push(menuId);
    }

    for (const id of [...ids, personsMenuId]) {
      if (id) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('role_menus')
          .values({
            role_id: 1,
            menu_id: id,
          })
          .execute();
      }
    }

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('screens', ['name', 'slug', 'description', 'icon'])
      .values([
        {
          name: 'Persons',
          slug: '/persons',
          description: 'Check all persons registered in the system.',
          icon: 'user-check',
        },
        {
          name: 'Address Types',
          slug: '/management/persons/address-types',
          description: 'Check all types of address registered in the system.',
          icon: 'home-link',
        },
        {
          name: 'Contact Types',
          slug: '/management/persons/contact-types',
          description: 'Check all types of contacts registered in the system.',
          icon: 'address-book',
        },
        {
          name: 'Custom Types',
          slug: '/management/persons/custom-types',
          description: 'Check all custom types registered in the system.',
          icon: 'adjustments',
        },
        {
          name: 'Document Types',
          slug: '/management/persons/document-types',
          description: 'Check all types of documents registered in the system.',
          icon: 'file-search',
        },
        {
          name: 'Person Types',
          slug: '/management/persons/person-types',
          description: 'Check all types of persons registered in the system.',
          icon: 'id',
        },
      ])
      .execute();

    const results = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('routes', ['url', 'method'])
      .values([
        {
          url: '/persons',
          method: 'GET',
        },
        {
          url: '/persons',
          method: 'POST',
        },
        {
          url: '/persons',
          method: 'DELETE',
        },
        {
          url: '/persons/:personId',
          method: 'GET',
        },
        {
          url: '/persons/:personId',
          method: 'PATCH',
        },
        {
          url: '/person-types',
          method: 'GET',
        },
        {
          url: '/person-types',
          method: 'POST',
        },
        {
          url: '/person-types',
          method: 'DELETE',
        },
        {
          url: '/person-types/:personTypeId',
          method: 'GET',
        },
        {
          url: '/person-types/:personTypeId',
          method: 'PATCH',
        },
        {
          url: '/address-types',
          method: 'GET',
        },
        {
          url: '/address-types',
          method: 'POST',
        },
        {
          url: '/address-types',
          method: 'DELETE',
        },
        {
          url: '/address-types/:addressTypeId',
          method: 'GET',
        },
        {
          url: '/address-types/:addressTypeId',
          method: 'PATCH',
        },
        {
          url: '/contact-types',
          method: 'GET',
        },
        {
          url: '/contact-types',
          method: 'POST',
        },
        {
          url: '/contact-types',
          method: 'DELETE',
        },
        {
          url: '/contact-types/:contactTypeId',
          method: 'GET',
        },
        {
          url: '/contact-types/:contactTypeId',
          method: 'PATCH',
        },
        {
          url: '/custom-types',
          method: 'GET',
        },
        {
          url: '/custom-types',
          method: 'POST',
        },
        {
          url: '/custom-types',
          method: 'DELETE',
        },
        {
          url: '/custom-types/:customTypeId',
          method: 'GET',
        },
        {
          url: '/custom-types/:customTypeId',
          method: 'PATCH',
        },
        {
          url: '/document-types',
          method: 'GET',
        },
        {
          url: '/document-types',
          method: 'POST',
        },
        {
          url: '/document-types',
          method: 'DELETE',
        },
        {
          url: '/document-types/:documentTypeId',
          method: 'GET',
        },
        {
          url: '/document-types/:documentTypeId',
          method: 'PATCH',
        },
      ])
      .returning('id')
      .execute();

    const roleRouteValues = results.raw.map((result) => ({
      role_id: 1,
      route_id: result.id,
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role_routes')
      .values(roleRouteValues)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person_custom_types');
    await queryRunner.dropTable('person_customs');
    await queryRunner.dropTable('person_address_types');
    await queryRunner.dropTable('person_addresses');
    await queryRunner.dropTable('person_contacts');
    await queryRunner.dropTable('person_contact_types');
    await queryRunner.dropTable('person_documents');
    await queryRunner.dropTable('person_document_types');
    await queryRunner.dropTable('person_types');
    await queryRunner.dropTable('persons');
    await queryRunner.dropTable('countries');
  }
}
