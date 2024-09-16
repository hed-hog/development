#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extra_typings_1 = require("@commander-js/extra-typings");
const commands_1 = require("../commands");
const local_binaries_1 = require("../lib/utils/local-binaries");
const bootstrap = async () => {
    const program = new extra_typings_1.Command();
    program
        .version(require('../package.json').version, '-v, --version', 'Output the current version.')
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information.');
    if ((0, local_binaries_1.localBinExists)()) {
        const localCommandLoader = (0, local_binaries_1.loadLocalBinCommandLoader)();
        await localCommandLoader.load(program);
    }
    else {
        await commands_1.CommandLoader.load(program);
    }
    await program.parseAsync(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
