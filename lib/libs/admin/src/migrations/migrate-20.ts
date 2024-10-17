import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const groups = [
      {
        slug: 'file-storage',
        icon: 'folder',
        name_en: 'File Storage',
        name_pt: 'Armazenamento de Arquivos',
        description_en: 'Settings related to file storage',
        description_pt:
          'Definições relacionadas com o armazenamento de arquivos',
        settings: [
          {
            slug: 'storage',
            type: 'string',
            name_en: 'Storage Provider',
            name_pt: 'Provedor de Armazenamento',
            description_en: 'The storage to use',
            description_pt: 'O armazenamento a utilizar',
            value: 'local',
          },
          {
            slug: 'storage-local-path',
            type: 'string',
            name_en: 'Local Path',
            name_pt: 'Caminho Local',
            description_en: 'The local path to store files',
            description_pt: 'O caminho local para armazenar arquivos',
            value: 'storage',
          },
          {
            slug: 'storage-s3-key',
            type: 'string',
            name_en: 'S3 Key',
            name_pt: 'Chave S3',
            description_en: 'The S3 key',
            description_pt: 'A chave S3',
            value: '',
          },
          {
            slug: 'storage-s3-secret',
            type: 'string',
            name_en: 'S3 Secret',
            name_pt: 'Segredo S3',
            description_en: 'The S3 secret',
            description_pt: 'O segredo S3',
            value: '',
          },
          {
            slug: 'storage-s3-region',
            type: 'string',
            name_en: 'S3 Region',
            name_pt: 'Região S3',
            description_en: 'The S3 region',
            description_pt: 'A região S3',
            value: '',
          },
          {
            slug: 'storage-s3-bucket',
            type: 'string',
            name_en: 'S3 Bucket',
            name_pt: 'Bucket S3',
            description_en: 'The S3 bucket',
            description_pt: 'O bucket S3',
            value: '',
          },
        ],
      },
      {
        icon: 'world',
        slug: 'localization',
        name_en: 'Localization',
        name_pt: 'Localização',
        description_en: 'Settings related to localization',
        description_pt: 'Definições relacionadas com a localização',
        settings: [
          {
            slug: 'language',
            type: 'string',
            name_en: 'Default Language',
            name_pt: 'Idioma Padrão',
            description_en:
              'The system default language, each user can have their own preferred language',
            description_pt:
              'O idioma padrão do sistema, cada usuário pode ter o seu próprio idioma preferido',
            value: 'en',
          },
          {
            slug: 'timezone',
            type: 'string',
            name_en: 'Timezone',
            name_pt: 'Fuso Horário',
            description_en: 'The timezone to use',
            description_pt: 'O fuso horário a utilizar',
            value: 'UTC',
          },
        ],
      },
      {
        icon: 'palette',
        slug: 'appearance',
        name_en: 'Appearance',
        name_pt: 'Aparência',
        description_en: 'Settings related to appearance',
        description_pt: 'Definições relacionadas com a aparência',
        settings: [
          {
            slug: 'primary',
            type: 'string',
            name_en: 'Primary Color',
            name_pt: 'Cor Primária',
            description_en: 'The primary color to use',
            description_pt: 'A cor primária a utilizar',
            value: '#000000',
          },
          {
            slug: 'secondary',
            type: 'string',
            name_en: 'Secondary Color',
            name_pt: 'Cor Secundária',
            description_en: 'The secondary color to use',
            description_pt: 'A cor secundária a utilizar',
            value: '#FFFFFF',
          },
          {
            slug: 'accent',
            type: 'string',
            name_en: 'Accent Color',
            name_pt: 'Cor de Realce',
            description_en: 'The accent color to use',
            description_pt: 'A cor de realce a utilizar',
            value: '#000000',
          },
          {
            slug: 'background',
            type: 'string',
            name_en: 'Background Color',
            name_pt: 'Cor de Fundo',
            description_en: 'The background color to use',
            description_pt: 'A cor de fundo a utilizar',
            value: '#FFFFFF',
          },
          {
            slug: 'muted',
            type: 'string',
            name_en: 'Muted Color',
            name_pt: 'Cor Suave',
            description_en: 'The muted color to use',
            description_pt: 'A cor suave a utilizar',
            value: '#000000',
          },
          {
            slug: 'radius',
            type: 'number',
            name_en: 'Border Radius',
            name_pt: 'Raio da Borda',
            description_en: 'The border radius to use',
            description_pt: 'O raio da borda a utilizar',
            value: 0.5,
          },
          {
            slug: 'font',
            type: 'string',
            name_en: 'Font Family',
            name_pt: 'Família de Fontes',
            description_en: 'The font family to use',
            description_pt: 'A família de fontes a utilizar',
            value: 'ui-sans-serif, system-ui, sans-serif',
          },
        ],
      },
    ];

    for (const group of groups) {
      const settingGroup = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('setting_groups', ['icon', 'slug'])
        .values({
          icon: group.icon,
          slug: group.slug,
        })
        .execute();

      const settingGroupId = settingGroup.raw.insertId;

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('setting_group_translations', [
          'locale_id',
          'group_id',
          'name',
          'description',
        ])
        .values([
          {
            locale_id: 1,
            group_id: settingGroupId,
            name: group.name_en,
            description: group.description_en,
          },
          {
            locale_id: 2,
            group_id: settingGroupId,
            name: group.name_pt,
            description: group.description_pt,
          },
        ])
        .execute();

      for (const s of group.settings) {
        const setting = await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('settings', ['slug', 'group_id', 'type', 'value'])
          .values({
            slug: s.slug,
            group_id: settingGroupId,
            type: s.type,
            value: s.value,
          })
          .execute();

        const settingId = setting.raw.insertId;

        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('setting_translations', [
            'locale_id',
            'setting_id',
            'name',
            'description',
          ])
          .values([
            {
              locale_id: 1,
              setting_id: settingId,
              name: s.name_en,
              description: s.description_en,
            },
            {
              locale_id: 2,
              setting_id: settingId,
              name: s.name_pt,
              description: s.description_pt,
            },
          ])
          .execute();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM setting_translations');
    await queryRunner.query('DELETE FROM settings');
    await queryRunner.query('DELETE FROM setting_group_translations');
    await queryRunner.query('DELETE FROM setting_groups');
  }
}
