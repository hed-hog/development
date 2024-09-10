import { Command } from '@commander-js/extra-typings';
import { AbstractCommand } from './abstract.command';

export class InfoCommand extends AbstractCommand {
  public load(program: Command) {
    program
      .command('info')
      .alias('i')
      .description('Display Nest project details.')
      .action(async () => {
        await this.action.handle();
      });
  }
}
