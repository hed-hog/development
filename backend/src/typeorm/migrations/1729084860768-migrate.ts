import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { idColumn, timestampColumn } from "@hedhog/utils";

export class Migrate1729084860768 implements MigrationInterface {
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
        name: "locales",
        columns: [
          idColumn(),
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
            name: "country_id",
            type: "int",
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
        .returning("id")
        .execute();

      locales[index].id = localeId.raw[0].id;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("locales");
  }
}
