"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAction = void 0;
const isomorphic_git_1 = require("isomorphic-git");
const abstract_action_1 = require("./abstract.action");
const fs = require("fs");
const node_1 = require("isomorphic-git/http/node");
const generate_random_string_1 = require("../lib/utils/generate-random-string");
const path_1 = require("path");
const ora = require("ora");
const package_managers_1 = require("../lib/package-managers");
const chalk = require("chalk");
const add_action_1 = require("./add.action");
const ui_1 = require("../lib/ui");
class NewAction extends abstract_action_1.AbstractAction {
    async handle(inputs, options) {
        const name = String(inputs.find(({ name }) => name === 'name')?.value || 'hedhog');
        const directory = options.find(({ name }) => name === 'directory');
        const directoryPath = `${String(directory?.value) || '.'}/${name}`;
        await this.cloneRepository('https://github.com/hed-hog/bootstrap.git', directoryPath);
        await this.configureGit(directoryPath);
        await this.createEnvFile(directoryPath, {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'hedhog',
        });
        const packageManager = await this.installPackages(options, directoryPath);
        process.chdir(name);
        await this.add('pagination');
        await this.add('auth');
        await this.add('user');
        process.chdir('..');
        this.complete(name, packageManager ?? 'npm');
    }
    complete(directory, packageManager) {
        console.info();
        console.info(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(directory));
        console.info(ui_1.MESSAGES.CONFIG_DATABASE);
        console.info(ui_1.MESSAGES.GET_STARTED_INFORMATION);
        console.info();
        console.info(chalk.gray(ui_1.MESSAGES.CHANGE_DIR_COMMAND(directory)));
        console.info(chalk.gray(ui_1.MESSAGES.START_COMMAND(packageManager)));
        console.info();
    }
    async add(module) {
        const action = new add_action_1.AddAction();
        return action.handle([{ name: 'module', value: module }], [{ name: 'silentComplete', value: true }]);
    }
    async installPackages(options, directory) {
        const inputPackageManager = options.find((option) => option.name === 'packageManager').value;
        let packageManager;
        try {
            packageManager = package_managers_1.PackageManagerFactory.create(inputPackageManager);
            return packageManager.install(directory, inputPackageManager);
        }
        catch (error) {
            if (error && error.message) {
                console.error(chalk.red(error.message));
            }
        }
    }
    async cloneRepository(url, directory) {
        const spinner = ora('Cloning repository').start();
        const result = await (0, isomorphic_git_1.clone)({
            url,
            dir: directory,
            fs,
            http: node_1.default,
        });
        spinner.succeed();
        return result;
    }
    async configureGit(directory) {
        const results = [];
        const spinner = ora('Configure git in project folder').start();
        results.push(await fs.promises.rm(`${directory}/.git`, { recursive: true }));
        results.push(await (0, isomorphic_git_1.init)({ dir: directory, fs }));
        spinner.succeed();
        return results;
    }
    async createEnvFile(dirPath, config) {
        const spinner = ora('Creating .env file').start();
        const secret = (0, generate_random_string_1.generateRandomString)(32);
        const envContent = `
DB_HOST="${config.host}"
DB_PORT="${config.port}"
DB_USERNAME="${config.user}"
DB_PASSWORD="${config.password}"
DB_DATABASE="${config.database}"

DATABASE_URL="postgresql://\${DB_USERNAME}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_DATABASE}"

JWT_SECRET="${secret}"
    `;
        const envFilePath = (0, path_1.join)(dirPath, '.env');
        const result = await fs.promises.writeFile(envFilePath, envContent.trim(), 'utf-8');
        spinner.succeed();
        return result;
    }
}
exports.NewAction = NewAction;
