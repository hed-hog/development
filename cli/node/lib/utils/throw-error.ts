import chalk = require('chalk');

export const throwError = (error: string): void => {
  console.error(chalk.red(error));
};
