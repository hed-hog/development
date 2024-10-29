import { executeQueryDatabase } from './execute-query-database';

export async function getMysqlTables({
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
}) {
  const result = await executeQueryDatabase(
    type as 'mysql' | 'postgres',
    host,
    port,
    user,
    password,
    database,
    `SELECT table_name FROM information_schema.tables WHERE table_schema = '${database}'`,
  );

  return result.map((row) => row.table_name);
}
