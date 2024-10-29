import { getDatabaseConfig } from './get-database-config';
import { getMysqlTables } from './get-mysql-tables';
import { getPostgresTables } from './get-postgres-tables';

export async function getTables() {
  const config = await getDatabaseConfig();

  switch (config.type) {
    case 'mysql':
      return await getMysqlTables(config);
    case 'postgres':
      return await getPostgresTables(config);
    default:
      throw new Error(`Unsupported database type: ${config.type}`);
  }
}
