"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const chalk = require("chalk");
const throwError = (error) => {
    console.error(chalk.red(error));
};
exports.throwError = throwError;
