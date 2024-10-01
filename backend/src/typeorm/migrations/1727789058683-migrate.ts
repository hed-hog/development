import { idColumn, timestampColumn } from '@hedhog/utils';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePersonsSchema1727789058683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          idColumn(),
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'person_type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_types',
        columns: [
          idColumn(),
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_documents',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'document_id',
            type: 'int',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'documents',
        columns: [
          idColumn(),
          {
            name: 'document_type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'document_number',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'issuing_country',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'issued_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'expiry_date',
            type: 'date',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_contacts',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'contact_id',
            type: 'int',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'contacts',
        columns: [
          idColumn(),
          {
            name: 'contact_type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'contact_value',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_addresses',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'address_id',
            type: 'int',
            isNullable: false,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          idColumn(),
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'address_type',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'person_custom_attributes',
        columns: [
          idColumn(),
          {
            name: 'person_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'attribute_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'attribute_value',
            type: 'text',
            isNullable: true,
          },
          timestampColumn(),
          timestampColumn('updated_at'),
        ],
        uniques: [
          {
            name: 'UQ_person_custom_attribute',
            columnNames: ['person_id', 'attribute_name'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('person_documents', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['document_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'documents',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createForeignKeys('person_contacts', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['contact_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contacts',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createForeignKeys('person_addresses', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'addresses',
        onDelete: 'CASCADE',
      }),
    ]);
    await queryRunner.createForeignKeys('person_custom_attributes', [
      new TableForeignKey({
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person_custom_attributes');
    await queryRunner.dropTable('person_addresses');
    await queryRunner.dropTable('addresses');
    await queryRunner.dropTable('person_contacts');
    await queryRunner.dropTable('contacts');
    await queryRunner.dropTable('person_documents');
    await queryRunner.dropTable('documents');
    await queryRunner.dropTable('person_types');
    await queryRunner.dropTable('persons');
  }
}
