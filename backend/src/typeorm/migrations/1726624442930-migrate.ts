import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { timestampColumn, idColumn } from "@hedhog/utils";

export class Migrate1726624442930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "files",
        columns: [
          idColumn(),
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "url",
            type: "varchar",
          },
          {
            name: "extension",
            type: "varchar",
            length: "15",
          },
          {
            name: "bytes",
            type: "int",
          },
          timestampColumn(),
          timestampColumn("updated_at"),
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO settings(name) VALUES('Storage Provider'),('AWS Storage'),('Azure Storage');`,
    );

    const rows = await queryRunner.query(`
        SELECT * FROM settings WHERE name in ('Storage Provider', 'AWS Storage','Azure Storage')
    `);

    for (const row of rows) {
      switch (row.name) {
        case "AWS Storage":
          await queryRunner.query(
            `INSERT INTO setting_values(value, name, description, label, setting_id) VALUES
            ('', 'ACCESS_KEY_ID', 'O campo AWS_ACCESS_KEY_ID é uma chave pública usada para identificar o usuário ou serviço que realiza chamadas à API da AWS, sendo necessária para autenticação junto com o AWS_SECRET_ACCESS_KEY.', 'ID da chave de acesso', ${row.id}),
            ('', 'SECRET_ACCESS_KEY', 'Chave secreta de acesso para autenticação segura em serviços da AWS.', 'Chave Secreta de Acesso', ${row.id}),
            ('', 'BUCKET_NAME', 'Nome do bucket de armazenamento na AWS.', 'Nome do Bucket', ${row.id})
            ;`,
          );
          break;

        case "Azure Storage":
          await queryRunner.query(
            `INSERT INTO setting_values(value, name, description, label, setting_id) VALUES
            ('', 'ACCOUNT_NAME', 'Nome da conta de armazenamento no Azure.', 'Nome da Conta de Armazenamento', ${row.id}),
            ('', 'ACCOUNT_KEY', 'Chave de acesso para autenticação e gerenciamento da conta de armazenamento.', 'Chave da Conta de Armazenamento', ${row.id}),
            ('', 'CONTAINER_NAME', 'Nome do contêiner dentro da conta de armazenamento.', 'Nome do Container', ${row.id})
            ;`,
          );
          break;

        case "Storage Provider":
          await queryRunner.query(
            `INSERT INTO setting_values(value, name, description, label, setting_id) VALUES
            ('', 'STORAGE_PROVIDER', 'Escolha entre AWS e Azure como provedor de armazenamento e forneça as informações correspondentes.', 'Provedor de armazenamento', ${row.id})
            ;`,
          );
          break;
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("files");
  }
}
