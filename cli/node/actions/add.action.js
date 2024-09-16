"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAction = void 0;
const chalk = require("chalk");
const package_managers_1 = require("../lib/package-managers");
const abstract_action_1 = require("./abstract.action");
const ora = require("ora");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const ui_1 = require("../lib/ui");
class AddAction extends abstract_action_1.AbstractAction {
    async handle(inputs, options) {
        const silentComplete = options.find(({ name }) => name === 'silentComplete')?.value || false;
        const module = String(inputs.find((input) => input.name === 'module')?.value || '').toLowerCase();
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
        const addedModule = await this.addModuleImportToAppModule(addModuleName, moduleImport, appModulePath);
        if (addedModule) {
            await this.copyMigrationsFiles(nodeModulePath);
            if (!silentComplete) {
                await this.complete(module);
            }
        }
    }
    async complete(module) {
        console.info();
        console.info(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(module));
        console.info(ui_1.MESSAGES.GET_STARTED_INFORMATION);
        console.info();
        console.info(chalk.gray(ui_1.MESSAGES.RUN_MIGRATE_COMMAND));
        console.info();
    }
    async copyMigrationsFiles(nodeModulePath) {
        const spinner = ora('Copying migrations files...').start();
        try {
            const migrationsPath = `${nodeModulePath}/src/migrations`;
            if ((0, fs_1.existsSync)(migrationsPath)) {
                let migrationsFiles = (await (0, promises_1.readdir)(migrationsPath))
                    .filter((file) => file.endsWith('.ts'))
                    .filter((file) => !file.endsWith('.d.ts'));
                for (const file of migrationsFiles) {
                    const timestamp = new Date().getTime();
                    const fileContent = await (0, promises_1.readFile)(`${migrationsPath}/${file}`, 'utf8');
                    await (0, promises_1.writeFile)(`src/typeorm/migrations/${timestamp}-migrate.ts`, fileContent.replace(/export class Migrate implements/g, `export class Migrate${timestamp} implements`));
                }
                spinner.succeed('Migrations files copied.');
                return true;
            }
            else {
                spinner.info('No migrations files found.');
            }
        }
        catch (error) {
            spinner.fail(error.message);
            return false;
        }
    }
    async addModuleImportToAppModule(addModuleName, moduleImport, appModulePath) {
        const spinner = ora('Adding module to app module...').start();
        try {
            let appModuleContent = (0, fs_1.readFileSync)(appModulePath, 'utf8');
            if (appModuleContent.includes(moduleImport)) {
                spinner.warn('Module already exists in app module.');
                return false;
            }
            appModuleContent = `${moduleImport}
${appModuleContent}
      `;
            appModuleContent = appModuleContent.replace(/(\n\s*imports:\s*\[[\s\S]*?)(\n\s*\])/m, `$1\n    ${addModuleName},$2`);
            await (0, promises_1.writeFile)(appModulePath, appModuleContent);
            spinner.succeed('Module added to app module.');
            return true;
        }
        catch (error) {
            spinner.fail(error.message);
            return false;
        }
    }
    async checkIfModuleExists(module, nodeModulePath) {
        const spinner = ora('Checking module installed...').start();
        const path = `${nodeModulePath}/dist/${module}.module.js`;
        try {
            await (0, promises_1.readFile)(path);
            spinner.succeed(`Module ${module} installed.`);
            return true;
        }
        catch (error) {
            spinner.fail(`Module ${module} not installed.`);
            return false;
        }
    }
    checkIfDirectoryIsPackage(directory) {
        const spinner = ora('Checking directory...').start();
        try {
            const packageJson = require(`${directory}/package.json`);
            if (!packageJson.dependencies['@nestjs/core']) {
                throw new Error('Directory is not a package.');
            }
            spinner.succeed('Directory is a package.');
            return packageJson;
        }
        catch (error) {
            spinner.fail('Directory is not a package.');
            return false;
        }
    }
    capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    async installPackage(module) {
        const packageManager = await package_managers_1.PackageManagerFactory.find();
        const result = await packageManager.addProduction([module], 'latest');
        return result;
    }
}
exports.AddAction = AddAction;
