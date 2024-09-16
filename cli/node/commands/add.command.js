"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class AddCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('add')
            .argument('<string>', 'module name')
            .option('--silent-complete', 'Skip completion message.', false)
            .allowUnknownOption()
            .description('Adds support for an external module to your project.')
            .usage('<module> [options] [module-specific-options]')
            .action(async (module, command) => {
            const options = [];
            options.push({ name: 'silentComplete', value: command.silentComplete });
            const inputs = [];
            inputs.push({ name: 'module', value: module });
            this.action.handle(inputs, options);
        });
    }
}
exports.AddCommand = AddCommand;
