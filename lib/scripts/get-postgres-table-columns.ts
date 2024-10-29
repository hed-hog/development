import { executeQueryDatabase } from './execute-query-database';

export async function getPostgresTableColumns(
  tableName: string,
  {
    type,
    host,
    port,
    user,
    password,
    database,
  }: {
    type: string;
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  },
) {
  const columns = await executeQueryDatabase(
    type as 'mysql' | 'postgres',
    host,
    port,
    user,
    password,
    database,
    `SELECT column_name, is_nullable, udt_name AS type, column_default AS default, data_type FROM information_schema.columns WHERE table_name = '${tableName}' AND table_schema = 'public'`,
  );

  const constraints = await executeQueryDatabase(
    type as 'mysql' | 'postgres',
    host,
    port,
    user,
    password,
    database,
    `
    SELECT kcu.column_name, ccu.table_name, tc.constraint_type
    FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
    WHERE tc.table_name = '${tableName}';
    `,
  );

  for (let i = 0; i < columns.length; i++) {
    if (
      columns[i].data_type === 'USER-DEFINED' &&
      columns[i].type.split('_')[columns[i].type.split('_').length - 1] ===
        'enum'
    ) {
      columns[i].enum = await executeQueryDatabase(
        type as 'mysql' | 'postgres',
        host,
        port,
        user,
        password,
        database,
        `
        SELECT enumlabel AS value
        FROM pg_enum
        WHERE enumtypid = '${columns[i].type}'::regtype;
        `,
      );
    }
  }

  return columns.map((row) => ({
    name: row.column_name,
    nullable: row.is_nullable === 'YES',
    type: row.type.replace('int4', 'int'),
    pk: constraints.find(
      (constraint) =>
        constraint.column_name === row.column_name &&
        constraint.constraint_type === 'PRIMARY KEY',
    )
      ? true
      : false,
    fk:
      constraints.find(
        (constraint) =>
          constraint.column_name === row.column_name &&
          constraint.constraint_type === 'FOREIGN KEY',
      )?.table_name ?? false,
    default: row.default !== null && row.default !== undefined,
    enum: row.enum,
  }));
}
