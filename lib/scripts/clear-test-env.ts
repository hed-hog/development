import { join } from 'path';
import { run } from './run';
import { existsSync } from 'fs';

const projectTestname = 'test';
const rootPath = join(__dirname, '..', '..');

async function deleteTestEnv() {
  return run(rootPath, 'npx', 'rimraf', projectTestname);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkDockerComposeExists() {
  try {
    const dockerComposePath = join(rootPath, 'test', 'docker-compose.yml');

    console.log('dockerComposePath:', dockerComposePath);
    console.log('dockerComposePath exists:', existsSync(dockerComposePath));

    if (existsSync(dockerComposePath)) {
      await run(rootPath, 'docker-compose', 'down', '-v');
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
