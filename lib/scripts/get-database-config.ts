import { join } from 'path';
import { parseEnv } from './parseEnv';

export async function getDatabaseConfig() {
  const envPath = join(__dirname, '..', '.env');
  console.log({ envPath });
  const envData: any = parseEnv(envPath);

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
