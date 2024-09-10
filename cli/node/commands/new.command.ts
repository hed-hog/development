import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class NewCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('new [name]')
      .alias('n')
      .description('Generate Hedhog project.')
      .option('--directory [directory]', 'Specify the destination directory')
      .option('-g, --skip-git', 'Skip git repository initialization.', false)
      .option('-s, --skip-install', 'Skip package installation.', false)
      .option(
        '-p, --package-manager [packageManager]',
        'Specify package manager.',
      )
      .action(async (name: string, command: Command) => {
        const options: Input[] = [];

        console.log({
          name,
          command,
        });

        options.push({ name: 'directory', value: command.directory });
        options.push({ name: 'skip-git', value: command.skipGit });
        options.push({ name: 'skip-install', value: command.skipInstall });
        options.push({
          name: 'packageManager',
          value: command.packageManager,
        });

        const inputs: Input[] = [];
        inputs.push({ name: 'name', value: name });

        console.log({ inputs });

        //await this.action.handle(inputs, options);
      });
  }
}
