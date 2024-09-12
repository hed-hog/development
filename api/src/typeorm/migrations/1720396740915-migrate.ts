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
  }
}
