"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANNER = void 0;
const chalk = require("chalk");
exports.BANNER = chalk.gray(`
+------------------------------------------+
|                                          |
|    ${chalk.yellow(` _   _          _ _   _`)}               |
|    ${chalk.yellow(`| | | |        | | | | |`)}              |
|    ${chalk.yellow(`| |_| | ___  __| | |_| | ___   __ _`)}   |
|    ${chalk.yellow(`|  _  |/ _ \/ _ \` |  _  |/ _ \ / _ \` |`)}  |
|    ${chalk.yellow(`| | | |  __/ (_| | | | | (_) | (_| |`)}  |
|    ${chalk.yellow(`\\_| |_/\\___|\\__,_\\_| |_/\\___/ \\__  |`)}  |
|                                 ${chalk.yellow(` __/  |`)}  |
|                                 ${chalk.yellow(`|____/ `)}  |
|                                          |
+------------------------------------------+

`);
