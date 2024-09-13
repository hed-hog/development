import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { idColumn, timestampColumn } from '@hedhog/utils';
import * as bcrypt from 'bcrypt';

export class Migrate implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'multifactors',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.query(`
        INSERT INTO multifactors (name) VALUES
        ('Email'),
        ('Applicativo');
      `);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'multifactor_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('users', [
      new TableForeignKey({
        columnNames: ['multifactor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'multifactors',
        name: 'fk_users_to_multifactors_on_multifactor_id',
        onDelete: 'Cascade',
      }),
    ]);

    const password = await bcrypt.hash(`hedhog`, 12);

    await queryRunner.query(
      `
          INSERT INTO users (name, email, password) VALUES
          ('Administrador', 'root@hcode.com.br', '${password}');
        `,
    );
  }
  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('multifactors');
  }
}
