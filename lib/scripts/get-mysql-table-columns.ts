import { executeQueryDatabase } from './execute-query-database';

export async function getMysqlTableColumns(
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
    `SELECT column_name, is_nullable, data_type, column_default AS \`default\`, column_type FROM information_schema.columns WHERE table_name = '${tableName}'`,
  );

  const constraints = await executeQueryDatabase(
    type as 'mysql' | 'postgres',
    host,
    port,
    user,
    password,
    database,
    `
    SELECT 
        kcu.column_name, 
        kcu.table_name, 
        tc.constraint_type
    FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            AND tc.table_schema = kcu.table_schema
        LEFT JOIN information_schema.referential_constraints AS rc
            ON rc.constraint_name = tc.constraint_name
            AND rc.constraint_schema = tc.table_schema
        LEFT JOIN information_schema.key_column_usage AS ccu
            ON ccu.constraint_name = rc.unique_constraint_name
            AND ccu.constraint_schema = rc.unique_constraint_schema
            AND ccu.ordinal_position = kcu.ordinal_position
    WHERE 
        tc.table_name = '${tableName}'
        AND tc.table_schema = '${database}';
    `,
  );

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
    enum: row.column_type.includes('enum(')
      ? row.column_type
          .match(/enum\((.*?)\)/)[1]
          .split(',')
          .map((e) => e.replace(/'/g, ''))
      : [],
  }));
}
