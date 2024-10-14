import { run } from './run';

const { spawn } = require('child_process');
const net = require('net');

function isPortInUse(port) {
  return new Promise((resolve, reject) => {
    try {
      const client = net.connect({ port: port }, () => {
        client.end();
        resolve(true);
      });

      client.on('error', () => {
        resolve(false);
      });
    } catch (error) {
      reject(error);
    }
  });
}

console.log({
  process: process.cwd(),
});

const serverProcess = spawn('npm', ['run', 'create-test-env'], {
  stdio: 'inherit', // Mostrar a saída do servidor no console
});

serverProcess.on('data', async (data) => {
  if (data.toString().includes('API is running')) {
    if (await isPortInUse(3000)) {
      const testProcess = spawn('npm', ['run', 'jest'], {
        stdio: 'inherit',
      });

      testProcess.on('close', async (code) => {
        serverProcess.kill('SIGINT');

        await run('npx', 'run', 'ts-node scripts/clear-test-env.ts');
      });
    }
  }
});

async function main() {}

main().catch((err) => {
  console.error('Error:', err);
});
