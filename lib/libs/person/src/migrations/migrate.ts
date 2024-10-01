import { idColumn, timestampColumn } from '@hedhog/utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePersonsSchema1680000000000 implements MigrationInterface {
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
            type: 'varchar',
            length: '50',
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
            type: 'varchar',
            length: '50',
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
