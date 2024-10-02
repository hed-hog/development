import { idColumn, timestampColumn } from '@hedhog/utils';

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1727197435336 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'screens',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('screens', ['name', 'slug', 'description', 'icon'])
      .values([
        {
          name: 'Users',
          slug: '/management/users',
          description: 'Check all users registered in the system.',
          icon: 'users',
        },
        {
          name: 'Roles',
          slug: '/management/roles',
          description: 'Check all roles registered in the system.',
          icon: 'circles',
        },
        {
          name: 'Screens',
          slug: '/management/screens',
          description: 'Check all screens registered in the system.',
          icon: 'monitor',
        },
        {
          name: 'Menus',
          slug: '/management/menus',
          description: 'Check all menus registered in the system.',
          icon: 'menu',
        },
        {
          name: 'Routes',
          slug: '/management/routes',
          description: 'Check all routes registered in the system.',
          icon: 'route',
        },
        {
          name: 'Settings',
          slug: '/management/settings',
          description: 'Check all settings registered in the system.',
          icon: 'settings',
        },
        {
          name: 'Persons',
          slug: '/management/persons',
          description: 'Check all persons registered in the system.',
          icon: 'user-check',
        },
        {
          name: 'Address Types',
          slug: '/management/address-types',
          description: 'Check all types of address registered in the system.',
          icon: 'home-link',
        },
        {
          name: 'Contact Types',
          slug: '/management/contact-types',
          description: 'Check all types of contacts registered in the system.',
          icon: 'address-book',
        },
        {
          name: 'Custom Types',
          slug: '/management/custom-types',
          description: 'Check all custom types registered in the system.',
          icon: 'adjustments',
        },
        {
          name: 'Document Types',
          slug: '/management/document-types',
          description: 'Check all types of documents registered in the system.',
          icon: 'file-search',
        },
        {
          name: 'Person Types',
          slug: '/management/person-types',
          description: 'Check all types of persons registered in the system.',
          icon: 'id',
        },
      ])
      .execute();
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('screens');
  }
}
