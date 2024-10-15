import { run } from './run';
import { spawn } from 'child_process';
import * as net from 'net';

console.log({
  direcoty: process.cwd(),
});

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

const serverProcess = spawn('npm', ['run', 'create-test-env'], {
  stdio: 'pipe',
  shell: true,
});

serverProcess.on('close', async (code, signal) => {
  console.log('serverProcess', { code, signal });

  await run(process.cwd(), 'npm', 'run', 'test:clear');
});

serverProcess.stdout.on('data', async (data) => {
  console.info(data.toString().replace(/\r\n|\n/, ''));

  if (data.toString().includes('API is running')) {
    if (await isPortInUse(3000)) {
      const testProcess = spawn('npm', ['run', 'jest'], {
        stdio: 'pipe',
        shell: true,
        cwd: process.cwd(),
      });

      console.log({ testProcess });

      testProcess.stdout.on('data', async (data2) => {
        console.info(data2.toString().replace(/\r\n|\n/, ''));
      });

      testProcess.stderr.on('data', async (data2) => {
        console.info(data2.toString().replace(/\r\n|\n/, ''));
      });

      testProcess.on('close', async (code) => {
        console.log('Test process exited with code', code);

        if (!serverProcess.killed) {
          console.log('Killing server process...');
          serverProcess.kill('SIGINT');
        }
      });
    }
  }
});

async function main() {}

main().catch((err) => {
  console.error('Error:', err);
});
