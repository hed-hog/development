import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const groups = [
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
            name_en: 'Language',
            name_pt: 'Idioma',
            description_en: 'The language to use',
            description_pt: 'O idioma a utilizar',
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
        icon: 'paint-brush',
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
        .returning('id')
        .execute();

      const settingGroupId = settingGroup.raw[0].id;

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
          .returning('id')
          .execute();

        const settingId = setting.raw[0].id;

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
