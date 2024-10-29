import { readFile } from 'fs/promises';
import { join } from 'path';
import { parseEnv } from 'util';

export async function getDatabaseConfig() {
  const envPath = join(__dirname, '..', '.env');
  const envContent = await readFile(envPath, 'utf-8');
  const envData: any = parseEnv(envContent);

  return {
    type: String(envData.DATABASE_URL)
      .split(':')[0]
      .replace('postgresql', 'postgres'),
    host: envData.DB_HOST,
    port: Number(envData.DB_PORT),
    user: envData.DB_USERNAME,
    password: envData.DB_PASSWORD,
    database: envData.DB_DATABASE,
  };
}
