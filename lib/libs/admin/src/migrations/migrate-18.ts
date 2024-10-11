import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { idColumn, timestampColumn } from '@hedhog/utils';

export class Migrate implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const groups = [
      {
        icon: 'world',
        name_en: 'Localization',
        name_pt: 'Localização',
        description_en: 'Settings related to localization',
        description_pt: 'Definições relacionadas com a localização',
        settings: [
          {
            name_en: 'Language',
            name_pt: 'Idioma',
            description_en: 'The language to use',
            description_pt: 'O idioma a utilizar',
            value: 'en',
          },
          {
            name_en: 'Timezone',
            name_pt: 'Fuso horário',
            description_en: 'The timezone to use',
            description_pt: 'O fuso horário a utilizar',
            value: 'UTC',
          },
        ],
      },
      {
        icon: 'paint-brush',
        name_en: 'Theme',
      },
    ];
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
