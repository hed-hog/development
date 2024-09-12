import chalk = require('chalk');
import { Input } from '../commands';
import { PackageManagerFactory } from '../lib/package-managers';
import { AbstractAction } from './abstract.action';
import * as ora from 'ora';
import { existsSync, readFileSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { MESSAGES } from '../lib/ui';
import { join } from 'path';

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

    await this.checkDependences(module, nodeModulePath);

    await this.checkIfModuleExists(module, nodeModulePath);

    const addedModule = await this.addModuleImportToAppModule(
      module,
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

  async add(module: string) {
    const action = new AddAction();
    return action.handle(
      [{ name: 'module', value: module }],
      [{ name: 'silentComplete', value: true }],
    );
  }

  async getModuleDependencies(modulePath: string) {
    const packageJsonPath = join(process.cwd(), modulePath, 'package.json');

    if (!existsSync(packageJsonPath)) {
      throw new Error('package.json not found.');
    }

    const packageJson = require(packageJsonPath);

    const dependencies = Object.assign(
      packageJson.dependencies ?? {},
      packageJson.devDependencies ?? {},
    );

    const hedhogDependencies: any[] = [];

    for (const [key, value] of Object.entries(dependencies)) {
      if (key.startsWith('@hedhog/')) {
        hedhogDependencies.push([key.split('@hedhog/')[1], value]);
      }
    }

    return hedhogDependencies;
  }

  getPackageInstalledModules(moduleName: string) {
    const packageJsonMainPath = join(process.cwd(), 'package.json');

    const packageJsonMain = require(packageJsonMainPath);

    const hedhogModules: any[] = [];

    for (const [key, value] of Object.entries(
      packageJsonMain.dependencies ?? {},
    )) {
      if (
        key.startsWith('@hedhog/') &&
        key.split('@hedhog/')[1] !== moduleName
      ) {
        hedhogModules.push([key.split('@hedhog/')[1], value]);
      }
    }

    return hedhogModules;
  }

  async checkDependences(moduleName: string, modulePath: string) {
    const moduleDependences = await this.getModuleDependencies(modulePath);
    const packageInstalledModules = this.getPackageInstalledModules(moduleName);

    const missingDependences = moduleDependences.filter(
      ([name]: [string, any]) =>
        !packageInstalledModules.find(([moduleName]) => moduleName === name),
    );

    for (const [name] of missingDependences) {
      await this.add(name);
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
    module: string,
    addModuleName: string,
    moduleImport: string,
    appModulePath: string,
  ) {
    console.log('addModuleImportToAppModule', {
      module,
    });
    const spinner = ora('Adding module to app module...').start();
    if (!['utils'].includes(module.toLowerCase())) {
      try {
        let appModuleContent = readFileSync(appModulePath, 'utf8');

        spinner.text = 'Checking if module already exists in app module...';

        if (appModuleContent.includes(moduleImport)) {
          spinner.warn('Module already exists in app module.');
          return false;
        }

        spinner.text = 'Adding module to app module...';

        appModuleContent = `${moduleImport}
${appModuleContent}
      `;

        appModuleContent = appModuleContent.replace(
          /(\n\s*imports:\s*\[[\s\S]*?)(\n\s*\])/m,
          `$1\n    ${addModuleName},$2`,
        );

        spinner.text = 'Writing changes to app module...';

        await writeFile(appModulePath, appModuleContent);

        spinner.succeed('Module added to app module.');

        return true;
      } catch (error) {
        spinner.fail(error.message);

        return false;
      }
    } else {
      spinner.succeed('Module import skipped.');
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
