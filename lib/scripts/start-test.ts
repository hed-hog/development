import { run } from './run';
import { spawn } from 'child_process';
import * as net from 'net';
import { join } from 'path';
import { sleep } from '../src/__tests__/utils/sleep';
import chalk from 'chalk';

const processes = {
  server: null,
  test: null,
  admin: null,
  puppeteer: null,
};

function finishProcess() {
  console.log('Finishing processes...');

  Object.keys(processes).forEach(async (key) => {
    if (processes[key]) {
      console.log('Killing process', key);
      processes[key].kill();
    }
  });

  let allProcessesFinished = false;

  const interval = setInterval(async () => {
    allProcessesFinished = Object.keys(processes).every(
      (key) => !processes[key],
    );

    if (allProcessesFinished) {
      clearInterval(interval);

      console.log('All processes finished!');

      await sleep(1000);

      console.log('Clearing test environment...');
      console.warn(chalk.bgYellow('Remove comment to run the script below:'));
      ///await run(process.cwd(), 'npm', 'run', 'test:clear');
    }
  }, 1000);

  console.log('Processes finished!');
}

function isPortInUse(port) {
  console.log('Checking if port', port, 'is in use...');
  return new Promise((resolve, reject) => {
    try {
      const client = net.connect({ port: port }, () => {
        console.log('Port', port, 'is in use.');
        client.end();
        resolve(true);
      });

      client.on('error', () => {
        console.log('Port', port, 'is free.');
        resolve(false);
      });
    } catch (error) {
      console.error('Error:', error);
      reject(error);
    }
  });
}

async function startPuppeteer() {
  console.log('Starting Puppeteer...');

  const puppeteerProcess = spawn('npm', ['run', 'puppeteer'], {
    stdio: 'pipe',
    shell: true,
    cwd: process.cwd(),
  });

  puppeteerProcess.stdout.on('data', async (data3) => {
    console.info(data3.toString().replace(/\r\n|\n/, ''));
  });

  puppeteerProcess.stderr.on('data', async (data3) => {
    console.info(data3.toString().replace(/\r\n|\n/, ''));
  });

  puppeteerProcess.on('close', async (code) => {
    console.log('Puppeteer process exited with code', code);

    await finishProcess();
  });

  processes.puppeteer = puppeteerProcess;

  return puppeteerProcess;
}

async function startAdmin() {
  const adminPath = join(process.cwd(), '..', 'test', 'admin');

  await run(adminPath, 'npm', 'i', '--force');

  const adminProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true,
    cwd: adminPath,
  });

  let startingPuppeteer = false;

  adminProcess.stdout.on('data', async (data2) => {
    console.info(data2.toString().replace(/\r\n|\n/, ''));

    if (!startingPuppeteer) {
      startingPuppeteer = true;
      if (await startLoopToCheckPortInUse(3100)) {
        await startPuppeteer();
      }
    }
  });

  adminProcess.stderr.on('data', async (data2) => {
    console.info(data2.toString().replace(/\r\n|\n/, ''));
  });

  adminProcess.on('close', async (code) => {
    console.log('Admin process exited with code', code);
  });

  processes.admin = adminProcess;

  return adminProcess;
}

async function startLoopToCheckPortInUse(port: number, sleepTime = 2000) {
  console.log('Checking if port', port, 'is free...');

  let isPortFree = await isPortInUse(port);

  while (!isPortFree) {
    console.log('Waiting for port', port, 'to be free...');
    await sleep(sleepTime);
    isPortFree = await isPortInUse(port);
  }

  return true;
}

async function startJest() {
  console.log('Starting Jest...');

  const testProcess = spawn('npm', ['run', 'jest'], {
    stdio: 'pipe',
    shell: true,
    cwd: process.cwd(),
  });

  testProcess.stdout.on('data', async (data2) => {
    console.info(data2.toString().replace(/\r\n|\n/, ''));
  });

  testProcess.stderr.on('data', async (data2) => {
    console.info(data2.toString().replace(/\r\n|\n/, ''));
  });

  testProcess.on('close', async (code) => {
    console.log('Test process exited with code', code);

    await startAdmin();
  });

  processes.test = testProcess;

  return testProcess;
}

async function startBackEnd() {
  console.log('Starting back-end...');

  const serverProcess = spawn('npm', ['run', 'create-test-env'], {
    stdio: 'pipe',
    shell: true,
  });

  serverProcess.on('close', async (code, signal) => {
    console.log('serverProcess close', { code, signal });
  });

  serverProcess.on('disconnect', async () => {
    console.log('serverProcess disconnect');
  });

  serverProcess.on('error', async (err) => {
    console.error('serverProcess error:', err);
  });

  serverProcess.on('exit', async (code, signal) => {
    console.log('serverProcess exit', { code, signal });
  });

  serverProcess.on('message', async (message, sendHandle) => {
    console.log('serverProcess message', { message, sendHandle });
  });

  serverProcess.stdout.on('data', async (data) => {
    console.info(data.toString().replace(/\r\n|\n/, ''));

    if (data.toString().includes('API is running')) {
      if (await isPortInUse(3000)) {
        await startJest();
      }
    }
  });

  serverProcess.stderr.on('data', async (data) => {
    console.info(data.toString().replace(/\r\n|\n/, ''));
  });

  processes.server = serverProcess;

  return serverProcess;
}

async function main() {
  console.log('Starting test environment...');
  await startBackEnd();
}

main().catch((err) => {
  console.error('Error:', err);
});
