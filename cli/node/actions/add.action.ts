import chalk = require('chalk');
import { Input } from '../commands';
import { PackageManagerFactory } from '../lib/package-managers';
import { AbstractAction } from './abstract.action';
import * as ora from 'ora';
import { existsSync, readFileSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { MESSAGES } from '../lib/ui';

export class AddAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const silentComplete =
      options.find(({ name }) => name === 'silentComplete')?.value || false;
    const module = String(
      inputs.find((input) => input.name === 'module')?.value || '',
    ).toLowerCase();
    const appModuleName = 'app.module.ts';
    const appModulePath = `src/${appModuleName}`;
    const addModuleName = `${this.capitalizeFirstLetter(module)}Module`;
    const packageName = `@hedhog/${module}`;
    const moduleImport = `import { ${addModuleName} } from '${packageName}';`;
    const directoryPath = process.cwd();
    const nodeModulePath = `node_modules/@hedhog/${module}`;

    if (!this.checkIfDirectoryIsPackage(directoryPath)) {
      console.error(chalk.red('This directory is not a package.'));
      return;
    }

    await this.installPackage(packageName);

    await this.checkIfModuleExists(module, nodeModulePath);

    const addedModule = await this.addModuleImportToAppModule(
      addModuleName,
      moduleImport,
      appModulePath,
    );

    if (addedModule) {
      await this.copyMigrationsFiles(nodeModulePath);
      if (!silentComplete) {
        await this.complete(module);
      }
    }
  }

  async complete(module: string) {
    console.info();
    console.info(MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(module));
    console.info(MESSAGES.GET_STARTED_INFORMATION);
    console.info();
    console.info(chalk.gray(MESSAGES.RUN_MIGRATE_COMMAND));
    console.info();
  }

  async copyMigrationsFiles(nodeModulePath: string) {
    const spinner = ora('Copying migrations files...').start();
    try {
      const migrationsPath = `${nodeModulePath}/src/migrations`;

      if (existsSync(migrationsPath)) {
        let migrationsFiles = (await readdir(migrationsPath))
          .filter((file) => file.endsWith('.ts'))
          .filter((file) => !file.endsWith('.d.ts'));

        for (const file of migrationsFiles) {
          const timestamp = new Date().getTime();
          const fileContent = await readFile(
            `${migrationsPath}/${file}`,
            'utf8',
          );

          await writeFile(
            `src/typeorm/migrations/${timestamp}-migrate.ts`,
            fileContent.replace(
              /export class Migrate implements/g,
              `export class Migrate${timestamp} implements`,
            ),
          );
        }

        spinner.succeed('Migrations files copied.');
        return true;
      } else {
        spinner.info('No migrations files found.');
      }
    } catch (error) {
      spinner.fail(error.message);
      return false;
    }
  }

  async addModuleImportToAppModule(
    addModuleName: string,
    moduleImport: string,
    appModulePath: string,
  ) {
    const spinner = ora('Adding module to app module...').start();
    try {
      let appModuleContent = readFileSync(appModulePath, 'utf8');

      if (appModuleContent.includes(moduleImport)) {
        spinner.warn('Module already exists in app module.');
        return false;
      }

      appModuleContent = `${moduleImport}
${appModuleContent}
      `;

      appModuleContent = appModuleContent.replace(
        /(\n\s*imports:\s*\[[\s\S]*?)(\n\s*\])/m,
        `$1\n    ${addModuleName},$2`,
      );

      await writeFile(appModulePath, appModuleContent);

      spinner.succeed('Module added to app module.');

      return true;
    } catch (error) {
      spinner.fail(error.message);

      return false;
    }
  }

  async checkIfModuleExists(module: string, nodeModulePath: string) {
    const spinner = ora('Checking module installed...').start();
    const path = `${nodeModulePath}/dist/${module}.module.js`;

    try {
      await readFile(path);
      spinner.succeed(`Module ${module} installed.`);
      return true;
    } catch (error) {
      spinner.fail(`Module ${module} not installed.`);
      return false;
    }
  }

  checkIfDirectoryIsPackage(directory: string) {
    const spinner = ora('Checking directory...').start();
    try {
      const packageJson = require(`${directory}/package.json`);

      if (!packageJson.dependencies['@nestjs/core']) {
        throw new Error('Directory is not a package.');
      }

      spinner.succeed('Directory is a package.');
      return packageJson;
    } catch (error) {
      spinner.fail('Directory is not a package.');
      return false;
    }
  }

  capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  async installPackage(module: string) {
    const packageManager = await PackageManagerFactory.find();
    const result = await packageManager.addProduction([module], 'latest');

    return result;
  }
}
