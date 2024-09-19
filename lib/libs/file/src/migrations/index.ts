import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumn, idColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'extension',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'bytes',
            type: 'int',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('settings')
      .values([
        { name: 'Storage Provider' },
        { name: 'AWS Storage' },
        { name: 'Azure Storage' },
      ])
      .execute();

    const rows = await queryRunner.manager
      .createQueryBuilder()
      .select('*')
      .from('settings', 's')
      .where('s.name IN (:...names)', {
        names: ['Storage Provider', 'AWS Storage', 'Azure Storage'],
      })
      .getRawMany();

    for (const row of rows) {
      switch (row.name) {
        case 'AWS Storage':
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('setting_values')
            .values([
              {
                value: '',
                name: 'ACCESS_KEY_ID',
                description:
                  'Chave pública usada para identificar o usuário ou serviço que realiza chamadas à API da AWS, sendo necessária para autenticação junto com o AWS_SECRET_ACCESS_KEY.',
                label: 'ID da chave de acesso',
                setting_id: row.id,
              },
              {
                value: '',
                name: 'SECRET_ACCESS_KEY',
                description:
                  'Chave secreta de acesso para autenticação segura em serviços da AWS.',
                label: 'Chave Secreta de Acesso',
                setting_id: row.id,
              },
              {
                value: '',
                name: 'BUCKET_NAME',
                description: 'Nome do bucket de armazenamento na AWS.',
                label: 'Nome do Bucket',
                setting_id: row.id,
              },
            ])
            .execute();
          break;

        case 'Azure Storage':
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('setting_values')
            .values([
              {
                value: '',
                name: 'ACCOUNT_NAME',
                description: 'Nome da conta de armazenamento no Azure.',
                label: 'Nome da Conta de Armazenamento',
                setting_id: row.id,
              },
              {
                value: '',
                name: 'ACCOUNT_KEY',
                description:
                  'Chave de acesso para autenticação e gerenciamento da conta de armazenamento.',
                label: 'Chave da Conta de Armazenamento',
                setting_id: row.id,
              },
              {
                value: '',
                name: 'CONTAINER_NAME',
                description:
                  'Nome do contêiner dentro da conta de armazenamento.',
                label: 'Nome do Container',
                setting_id: row.id,
              },
            ])
            .execute();
          break;

        case 'Storage Provider':
          await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('setting_values')
            .values([
              {
                value: '',
                name: 'STORAGE_PROVIDER',
                description:
                  'Escolha entre AWS e Azure como provedor de armazenamento e forneça as informações correspondentes.',
                label: 'Provedor de armazenamento',
                setting_id: row.id,
              },
            ])
            .execute();
          break;
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
