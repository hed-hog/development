import { timestampColumn } from '@hedhog/utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'role_users',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_users', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        name: 'fk_role_users_roles',
      }),

      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'fk_role_users_users',
      }),
    ]);

    const roleUsers = [
      { role_id: 1, user_id: 1 },
      { role_id: 2, user_id: 2 },
    ];

    for (const roleUser of roleUsers) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('role_users')
        .values(roleUser)
        .execute();
    }
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('role_users');
  }
}
