import * as chalk from 'chalk';
import { Command } from '@commander-js/extra-typings';
import { AddAction, InfoAction, NewAction } from '../actions';
import { AddCommand } from './add.command';
import { NewCommand } from './new.command';
import { ERROR_PREFIX } from '../lib/ui';
import { InfoCommand } from './info.command';
export class CommandLoader {
  public static async load(program: Command): Promise<void> {
    new NewCommand(new NewAction()).load(program);
    new AddCommand(new AddAction()).load(program);
    new InfoCommand(new InfoAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
