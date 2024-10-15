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

serverProcess.stdout.on('data', async (data) => {
  console.info(data.toString().replace(/\r\n|\n/, ''));

  if (data.toString().includes('API is running')) {
    if (await isPortInUse(3000)) {
      const testProcess = spawn('npm', ['run', 'jest'], {
        stdio: 'pipe',
        shell: true,
      });

      testProcess.stdout.on('data', async (data) => {
        console.info(data.toString().replace(/\r\n|\n/, ''));
      });

      testProcess.on('close', async (code) => {
        console.log('Test process exited with code', code);

        if (code === 0) {
          serverProcess.kill('SIGINT');

          await run(
            process.cwd(),
            'npx',
            'run',
            'ts-node scripts/clear-test-env.ts',
          );
        }
      });
    }
  }
});

async function main() {}

main().catch((err) => {
  console.error('Error:', err);
});
