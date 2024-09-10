import { clone, init } from 'isomorphic-git';
import { Input } from '../commands';
import { AbstractAction } from './abstract.action';
import * as fs from 'fs';
import http from 'isomorphic-git/http/node';
import { generateRandomString } from '../lib/utils/generate-random-string';
import { join } from 'path';
import * as ora from 'ora';
import {
  AbstractPackageManager,
  PackageManagerFactory,
} from '../lib/package-managers';
import chalk = require('chalk');

export class NewAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const name = inputs.find(({ name }) => name === 'name');
    const directory = options.find(({ name }) => name === 'directory');
    const skipInstall = options.find(({ name }) => name === 'skip-install');
    const skipGit = options.find(({ name }) => name === 'skip-git');

    const directoryPath = String(directory?.value) || '.';

    await this.cloneRepository(
      'https://github.com/hed-hog/bootstrap.git',
      directoryPath,
    );

    await this.configureGit(directoryPath);

    await this.createEnvFile(directoryPath, {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'hedhog',
    });

    await this.installPackages(options, directoryPath);
  }

  async installPackages(options: Input[], directory: string) {
    const inputPackageManager = options.find(
      (option) => option.name === 'packageManager',
    )!.value as string;

    let packageManager: AbstractPackageManager;

    try {
      packageManager = PackageManagerFactory.create(inputPackageManager);
      await packageManager.install(directory, inputPackageManager);
    } catch (error) {
      if (error && error.message) {
        console.error(chalk.red(error.message));
      }
    }
  }

  async cloneRepository(url: string, directory: string) {
    const spinner = ora('Cloning repository').start();
    const result = await clone({
      url,
      dir: directory,
      fs,
      http,
    });
    spinner.succeed();
    return result;
  }

  async configureGit(directory: string) {
    const results = [];
    const spinner = ora('Configure git in project folder').start();
    results.push(
      await fs.promises.rm(`${directory}/.git`, { recursive: true }),
    );
    results.push(await init({ dir: directory, fs }));
    spinner.succeed();
    return results;
  }

  async createEnvFile(
    dirPath: string,
    config: {
      host: string;
      port: number;
      user: string;
      password: string;
      database: string;
    },
  ) {
    const spinner = ora('Creating .env file').start();
    const secret = generateRandomString(32);

    const envContent = `
DB_HOST="${config.host}"
DB_PORT="${config.port}"
DB_USERNAME="${config.user}"
DB_PASSWORD="${config.password}"
DB_DATABASE="${config.database}"

DATABASE_URL="postgresql://\${DB_USERNAME}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_DATABASE}"

JWT_SECRET="${secret}"
    `;

    const envFilePath = join(dirPath, '.env');

    const result = await fs.promises.writeFile(
      envFilePath,
      envContent.trim(),
      'utf-8',
    );
    spinner.succeed();
    return result;
  }
}
