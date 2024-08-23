import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { timestampColumn } from '../utils/timestampColumn';
import { idColumn } from '../utils/idColumn';

export class Migrate1720396740915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO roles (id, name, description) VALUES
      (1, 'Administrador', 'Administrar todos os acessos.');`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'role_models',
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

    await queryRunner.query(
      `INSERT INTO role_models (id, name) VALUES
      (1, 'persons');`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'role_actions',
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

    await queryRunner.query(
      `
        INSERT INTO role_actions (id, name) VALUES
        (1, 'Create'),
        (2, 'Read'),
        (3, 'Update'),
        (4, 'Delete');
      `,
    );

    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'model_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'action_id',
            type: 'int',
            isPrimary: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('role_permissions', [
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        name: 'fk_role_permissions_to_roles_on_role_id',
        onDelete: 'Cascade',
      }),
      new TableForeignKey({
        columnNames: ['model_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role_models',
        name: 'fk_role_permissions_to_role_models_on_model_id',
        onDelete: 'Cascade',
      }),
      new TableForeignKey({
        columnNames: ['action_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role_actions',
        name: 'fk_role_permissions_to_role_actions_on_action_id',
        onDelete: 'Cascade',
      }),
    ]);

    const models = await queryRunner.query(`SELECT id FROM role_models`);

    for (const model of models) {
      await queryRunner.query(
        `
          INSERT INTO role_permissions (role_id, model_id, action_id) VALUES
          (1, ${model.id}, 1),
          (1, ${model.id}, 2),
          (1, ${model.id}, 3),
          (1, ${model.id}, 4);
        `,
      );
    }

    await queryRunner.createTable(
      new Table({
        name: 'visibilities',
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

    await queryRunner.query(
      `
        INSERT INTO visibilities (name) VALUES
        ('Privado'),
        ('Público'),
        ('Não Listado');
      `,
    );

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

    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'display_name',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '1',
          },
          {
            name: 'birth_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'photo_id',
            type: 'int',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createForeignKeys('persons', [
      new TableForeignKey({
        columnNames: ['photo_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        name: 'fk_persons_to_files_on_photo_id',
        onDelete: 'Cascade',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('persons');
    await queryRunner.dropTable('files');
    await queryRunner.dropTable('visibilities');
    await queryRunner.dropTable('role_permissions');
    await queryRunner.dropTable('role_actions');
    await queryRunner.dropTable('role_models');
    await queryRunner.dropTable('roles');
  }
}
