import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

if (!process.env.DB_HOST) {
  throw new Error('DB_HOST not defined on .env file');
}

if (!process.env.DB_PORT) {
  throw new Error('DB_PORT not defined on .env file');
}

if (!process.env.DB_USERNAME) {
  throw new Error('DB_USERNAME not defined on .env file');
}

if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD not defined on .env file');
}

if (!process.env.DB_DATABASE) {
  throw new Error('DB_DATABASE not defined on .env file');
}

console.log({
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
});

const opts: DataSourceOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [`${__dirname}/migrations/**/*.ts`],
  subscribers: [],
};

if (existsSync(join(__dirname, String(process.env.DB_SSL_FILENAME)))) {
  console.log(
    `PATH SSL:`,
    join(__dirname, String(process.env.DB_SSL_FILENAME)),
  );
  (opts as any).ssl = {
    ca: readFileSync(join(__dirname, String(process.env.DB_SSL_FILENAME))),
    extra: {
      trustServerCertificate: true,
      Encrypt: true,
      IntegratedSecurity: false,
    },
  };
}

export const AppDataSource = new DataSource(opts as DataSourceOptions);
