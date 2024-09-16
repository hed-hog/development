"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCommand = void 0;
const abstract_command_1 = require("./abstract.command");
const throw_error_1 = require("../lib/utils/throw-error");
const validade_directory_1 = require("../lib/utils/validade-directory");
class NewCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('new')
            .alias('n')
            .description('Generate Hedhog project.')
            .argument('<string>', 'project name')
            .option('--directory <directory>', 'Specify the destination directory', '.')
            .option('-g, --skip-git', 'Skip git repository initialization.', false)
            .option('-s, --skip-install', 'Skip package installation.', false)
            .option('-p, --package-manager [packageManager]', 'Specify package manager.', 'npm')
            .action(async (name, command) => {
            try {
                if (!name) {
                    throw new Error('Name is required');
                }
                if (!(0, validade_directory_1.validateDirectory)(command.directory)) {
                    throw new Error('Directory is not valid');
                }
                const options = [];
                options.push({ name: 'directory', value: command.directory });
                options.push({ name: 'skip-git', value: command.skipGit });
                options.push({ name: 'skip-install', value: command.skipInstall });
                options.push({
                    name: 'packageManager',
                    value: command.packageManager,
                });
                const inputs = [];
                inputs.push({ name: 'name', value: name });
                await this.action.handle(inputs, options);
            }
            catch (error) {
                (0, throw_error_1.throwError)(error.message);
            }
        });
    }
}
exports.NewCommand = NewCommand;
