#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import { CommandLoader } from '../commands';
import {
  loadLocalBinCommandLoader,
  localBinExists,
} from '../lib/utils/local-binaries';

const bootstrap = async () => {
  const program = new Command();

  program
    .version(
      require('../package.json').version,
      '-v, --version',
      'Output the current version.',
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information.');

  if (localBinExists()) {
    const localCommandLoader = loadLocalBinCommandLoader();
    await localCommandLoader.load(program);
  } else {
    await CommandLoader.load(program);
  }
  await program.parseAsync(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

bootstrap();
