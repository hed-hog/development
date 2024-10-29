import { readdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { createDirectoryRecursive } from './create-directory-recursive';
import { databaseTypeToJavascriptType } from './database-type-to-javascript-type';
import { getTableColumns } from './get-table-columns';
import { getTables } from './get-tables';
import { snakeCaseToPascalCase } from './snake-case-topascal-case';

async function emptyDirectory(path: string) {
  const files = await readdir(path);

  for (const file of files) {
    await unlink(join(path, file));
  }
}

async function createEnumFile(path: string, tableName: string, columns: any[]) {
  if (tableName === 'settings') {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].enum) {
        const name = columns[i].type;
        const enumFile = [`export enum ${snakeCaseToPascalCase(name)} {`];
        const values = [];
        for (const enumValue of columns[i].enum) {
          values.push(`  ${enumValue.value} = '${enumValue.value}'`);
        }

        enumFile.push(values.join(','));
        enumFile.push('}');

        await writeFile(
          join(path, `${snakeCaseToPascalCase(name)}.ts`),
          enumFile.join('\n'),
          'utf-8',
        );
      }
    }
  }

  return columns;
}

async function createTypes(path: string) {
  const tables = await getTables();

  for (const table of tables) {
    let columns = await getTableColumns(table);
    columns = await createEnumFile(path, table, columns);
    await createTypeFile(table, snakeCaseToPascalCase(table), columns);
  }

  for (const table of tables) {
    await addReverseRelation(table);
  }
}

function isOptionalColumn(column: any) {
  return column.nullable || column.pk || column.default;
}

const files = {};

async function addReverseRelation(typeName: string) {
  for (const fk of files[snakeCaseToPascalCase(typeName)].fks) {
    let name = typeName;

    if (
      files[snakeCaseToPascalCase(fk.name)] &&
      files[snakeCaseToPascalCase(fk.table)].props
        .map((p) => p.name)
        .includes(typeName)
    ) {
      name = `other_${typeName}`;
    } else if (
      !files[snakeCaseToPascalCase(fk.name)] &&
      files[snakeCaseToPascalCase(fk.table)].props
    ) {
      name = fk.inverted;
    }

    files[snakeCaseToPascalCase(fk.table)].props.push({
      name,
      optional: true,
      type: `${snakeCaseToPascalCase(typeName)}[]`,
    });

    if (fk.table !== typeName) {
      files[snakeCaseToPascalCase(fk.table)].imports.push(
        snakeCaseToPascalCase(typeName),
      );
    }
  }
}

async function createTypeFile(
  tableName: string,
  typeName: string,
  columns: any[],
) {
  const fields = [];
  const fks = [];
  const imports = [];
  const props = [];

  for (const column of columns) {
    let type = databaseTypeToJavascriptType(column.type);

    if (typeof type === 'object' && type.enum) {
      type = snakeCaseToPascalCase(column.type);
      imports.push(snakeCaseToPascalCase(column.type));
    }

    props.push({
      name: column.name,
      optional: isOptionalColumn(column),
      type,
    });
    fields.push(column.name);
  }

  for (const column of columns) {
    if (column.fk) {
      fields.push(column.fk);

      if (typeName !== snakeCaseToPascalCase(column.fk)) {
        imports.push(snakeCaseToPascalCase(column.fk));
      }

      let inverted = column.fk;
      let name = column.fk;
      let exists = false;

      if (props.map((p) => p.name).includes(name)) {
        const originalName = name;
        name = `${originalName}_${tableName}_${column.name}To${originalName}`;
        inverted = `${tableName}_${tableName}_${column.name}To${originalName}`;
        exists = true;
      }

      props.push({
        name,
        optional: true,
        type: snakeCaseToPascalCase(column.fk),
        exists,
      });

      fks.push({ table: column.fk, name, inverted });
    }
  }

  files[typeName] = { fields, fks, imports, props };
}

async function writeFiles(path: string) {
  for (const fileName of Object.keys(files)) {
    const file = files[fileName];
    const filepath = join(path, `${fileName}.ts`);
    const lines = [];

    for (const imp of [...new Set(file.imports)]) {
      lines.push(`import { ${imp} } from './${imp}';`);
    }

    lines.push('');

    lines.push(`export type ${fileName} = {`);

    for (const prop of [...new Set(file.props)] as any[]) {
      lines.push(`  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type};`);
    }

    lines.push('}');

    await writeFile(filepath, lines.join('\n'), 'utf-8');
  }
}

async function createIndex(path: string) {
  const lines = [];

  for (const fileName of Object.keys(files)) {
    lines.push(`export * from './${fileName}';`);
  }

  await writeFile(join(path, 'index.ts'), lines.join('\n'), 'utf-8');
}

async function main() {
  const pathAdmin = join(__dirname, '../../admin/src/types/models');

  await createDirectoryRecursive(pathAdmin);
  await emptyDirectory(pathAdmin);
  await createTypes(pathAdmin);
  await writeFiles(pathAdmin);
  await createIndex(pathAdmin);
}

main().catch((err) => {
  console.error('Error:', err);
});
