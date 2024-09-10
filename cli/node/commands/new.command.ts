import { Command } from '@commander-js/extra-typings';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { throwError } from '../lib/utils/throw-error';
import { validateDirectory } from '../lib/utils/validade-directory';

export class NewCommand extends AbstractCommand {
  public load(program: Command) {
    program
      .command('new')
      .alias('n')
      .description('Generate Hedhog project.')
      .argument('<string>', 'project name')
      .option(
        '--directory <directory>',
        'Specify the destination directory',
        '.',
      )
      .option('-g, --skip-git', 'Skip git repository initialization.', false)
      .option('-s, --skip-install', 'Skip package installation.', false)
      .option(
        '-p, --package-manager [packageManager]',
        'Specify package manager.',
        'npm',
      )
      .action(async (name, command) => {
        try {
          if (!name) {
            throw new Error('Name is required');
          }

          if (!validateDirectory(command.directory)) {
            throw new Error('Directory is not valid');
          }

          const options: Input[] = [];

          options.push({ name: 'directory', value: command.directory });
          options.push({ name: 'skip-git', value: command.skipGit });
          options.push({ name: 'skip-install', value: command.skipInstall });
          options.push({
            name: 'packageManager',
            value: command.packageManager,
          });

          const inputs: Input[] = [];
          inputs.push({ name: 'name', value: name });

          await this.action.handle(inputs, options);
        } catch (error) {
          throwError(error.message);
        }
      });
  }
}
