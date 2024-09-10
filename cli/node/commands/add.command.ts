import { Command } from '@commander-js/extra-typings';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class AddCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('add <module>')
      .allowUnknownOption()
      .description('Adds support for an external module to your project.')
      .option(
        '-d, --dry-run',
        'Report actions that would be performed without writing out results.',
      )
      .option('-s, --skip-install', 'Skip package installation.', false)
      .option('-p, --project [project]', 'Project in which to generate files.')
      .usage('<module> [options] [module-specific-options]')
      .action(async (module, command) => {
        const options: Input[] = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({ name: 'skip-install', value: command.skipInstall });

        const inputs: Input[] = [];
        inputs.push({ name: 'module', value: module });
      });
  }
}
