import { Command } from '@commander-js/extra-typings';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class AddCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('add')
      .argument('<string>', 'module name')
      .option('--silent-complete', 'Skip completion message.', false)
      .allowUnknownOption()
      .description('Adds support for an external module to your project.')
      .usage('<module> [options] [module-specific-options]')
      .action(async (module, command) => {
        const options: Input[] = [];

        options.push({ name: 'silentComplete', value: command.silentComplete });
        const inputs: Input[] = [];
        inputs.push({ name: 'module', value: module });
        this.action.handle(inputs, options);
      });
  }
}
