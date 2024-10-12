import { join } from 'path';
import { run } from './run';
import { existsSync, rmdir } from 'fs';
import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';
import { Client as PgClient } from 'pg';

const projectTestname = 'test';
const rootPath = join(__dirname, '..', '..');
const projectTestPath = join(rootPath, projectTestname);

async function getDatabaseTestEnv() {
  const envPath = join(projectTestPath, 'backend', 'src', '.env');
  let type = 'postgresql';
  let defaultValues: any = {
    DB_HOST: 'localhost',
    DB_PORT: '9000',
    DB_USERNAME: 'hedhog',
    DB_PASSWORD: 'changeme',
    DB_DATABASE: 'hedhog_test',
  };

  if (existsSync(envPath)) {
    const envContent = await readFile(envPath, 'utf8');
    const envConfig = dotenv.parse(envContent);

    defaultValues = Object.assign(defaultValues, envConfig);
    if (defaultValues.DATABASE_URL) {
      type = defaultValues.DATABASE_URL.split(':')[0];
    }
  }

  return { env: defaultValues, type };
}

async function checkDatabaseTestExists() {
  try {
    const { env, type } = await getDatabaseTestEnv();

    if (type === 'postgresql') {
      console.log(
        'Checking if database exists on postgresql:',
        env.DB_DATABASE,
        {
          user: env.DB_USERNAME,
          host: env.DB_HOST,
          port: parseInt(env.DB_PORT),
          password: env.DB_PASSWORD,
        },
      );
      const client = new PgClient({
        user: env.DB_USERNAME,
        host: env.DB_HOST,
        port: parseInt(env.DB_PORT),
        password: env.DB_PASSWORD,
        database: undefined,
      });

      await client.connect();

      //Check if database exists
      const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = '${env.DB_DATABASE}'`,
      );

      if (res.rows.length > 0) {
        await client.query('DROP SCHEMA public CASCADE;');
        await client.query('CREATE SCHEMA public;');
      } else {
        await client.query(`CREATE DATABASE ${env.DB_DATABASE}`);
      }

      await client.end();
    } else if (type === 'mysql') {
      const connection = await createConnection({
        host: env.DB_HOST,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        port: parseInt(env.DB_PORT),
      });

      await connection.query(`DROP DATABASE IF EXISTS ${env.DB_DATABASE}`);

      await connection.query(`CREATE DATABASE ${env.DB_DATABASE}`);

      await connection.end();
    }
  } catch (error) {
    console.error('Error:', 'checkDatabaseTestExists', error);
  }
}

async function deleteTestEnv() {
  return run(rootPath, 'npx', 'rimraf', projectTestname);
}

async function createTestEnv() {
  return run(
    rootPath,
    'hedhog',
    'new',
    projectTestname,
    '--database',
    'postgres',
    '--dbhost',
    'localhost',
    '--dbport',
    '9000',
    '--dbuser',
    'hedhog',
    '--dbpassword',
    'changeme',
    '--dbname',
    'hedhog_test',
    '--force',
    '--docker-compose',
    '--data-volume "../test-data"',
  );
}

async function addhedhogModules() {
  return run(projectTestPath, 'hedhog', 'add', 'person');
}

async function startProject() {
  return run(join(projectTestPath, 'backend'), 'npm', 'start');
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkDockerComposeExists() {
  try {
    const dockerComposePath = join(rootPath, 'test', 'docker-compose.yml');

    if (existsSync(dockerComposePath)) {
      await run(rootPath, 'docker-compose', 'down', '-v');
    }

    await sleep(5000);

    if (existsSync(join(rootPath, 'test-data'))) {
      await run(join(rootPath), 'npx', 'rimraf', 'test-data');
    }
    return true;
  } catch (error) {
    console.error('Error:', 'checkDockerComposeExists', error);
  }
  return false;
}

async function main() {
  const dockerCompose = await checkDockerComposeExists();
  /*if (!dockerCompose) {
    await checkDatabaseTestExists();
  }*/
  await deleteTestEnv();
  await createTestEnv();
  await addhedhogModules();
  await startProject();
  console.log('Test project is running!');
}

main().catch((err) => {
  console.error('Error:', err);
});
