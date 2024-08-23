import net from 'net';
import chalk from 'chalk';

function checkPort(port, host = 'localhost') {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket
      .on('connect', () => {
        socket.destroy();
        resolve(true);
      })
      .on('timeout', () => {
        socket.destroy();
        resolve(false);
      })
      .on('error', () => {
        resolve(false);
      })
      .connect(port, host);
  });
}

async function waitForPorts() {
  let apiReady = false;
  let frontendReady = false;

  while (!apiReady || !frontendReady) {
    apiReady = await checkPort(3000);
    frontendReady = await checkPort(3100);

    if (!apiReady || !frontendReady) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.clear();
  console.log(chalk.white('===================================='));
  console.log(chalk.green('A aplicação HedHog está em execução:'));
  console.log(chalk.blue('API na porta http://localhost:3000'));
  console.log(chalk.red('Front-end na porta http://localhost:3100'));
}

waitForPorts();
