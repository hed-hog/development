import { join } from 'path';
import { run } from './run';
import { existsSync } from 'fs';
import { sleep } from '../src/__tests__/utils/sleep';

const projectTestname = 'test';
const rootPath = join(__dirname, '..', '..');

async function deleteTestEnv() {
  console.log('Removing test project...');
  return run(rootPath, 'npx', 'rimraf', projectTestname);
}

async function checkDockerComposeExists() {
  try {
    const dockerComposePath = join(rootPath, 'test', 'docker-compose.yml');

    if (existsSync(dockerComposePath)) {
      console.log('Stopping docker-compose and remove volume...');
      await run(join(rootPath, 'test'), 'docker', 'compose', 'down', '-v');
      await sleep(5000);
      console.log('Docker-compose stopped and volume removed!');
    }

    return true;
  } catch (error) {
    console.error('Error:', 'checkDockerComposeExists', error);
  }
  return false;
}

async function main() {
  if (await checkDockerComposeExists()) {
    await deleteTestEnv();
  }
  console.log('Test project removed!');
}

main().catch((err) => {
  console.error('Error:', err);
});
