import { getDatabaseConfig } from './get-database-config';
import { getMysqlTableColumns } from './get-mysql-table-columns';
import { getPostgresTableColumns } from './get-postgres-table-columns';

export async function getTableColumns(tableName: string) {
  const config = await getDatabaseConfig();
  switch (config.type) {
    case 'mysql':
      return await getMysqlTableColumns(tableName, config);
    case 'postgres':
      return await getPostgresTableColumns(tableName, config);
  }
}
