import { join } from 'path';
import { run } from './run';
import { existsSync } from 'fs';
import { sleep } from '../src/__tests__/utils/sleep';

const projectTestname = 'test';
const rootPath = join(__dirname, '..', '..');
const projectTestPath = join(rootPath, projectTestname);

async function deleteTestEnv() {
  console.log('Removing test project...');
  return run(rootPath, 'npx', 'rimraf', projectTestname);
}

async function createTestEnv() {
  console.log('Creating test project...');
  return run(
    rootPath,
    'hedhog',
    'new',
    projectTestname,
    '--database',
    'postgres',
    '--dbhost',
    'localhost',
    '--dbport',
    '9000',
    '--dbuser',
    'hedhog',
    '--dbpassword',
    'changeme',
    '--dbname',
    'hedhog_test',
    '--force',
    '--docker-compose',
    '--data-volume "test-data"',
  );
}

async function addhedhogModules() {
  console.log('Adding hedhog modules...');
  return run(projectTestPath, 'hedhog', 'add', 'person');
}

async function startProject() {
  console.log('Starting project...');
  return run(join(projectTestPath, 'backend'), 'npm', 'start');
}

async function checkDockerComposeExists() {
  console.log('Checking if docker-compose exists...');
  try {
    const dockerComposePath = join(projectTestPath, 'docker-compose.yml');

    if (existsSync(dockerComposePath)) {
      console.log('Stopping docker-compose and remove volume...');
      await run(projectTestPath, 'docker', 'compose', 'down', '-v');
      await sleep(5000);
      console.log('Docker-compose stopped and volume removed!');
    } else {
      console.log('Docker-compose does not exist!');
    }

    return true;
  } catch (error) {
    console.error('Error:', 'checkDockerComposeExists', error);
  }
  return false;
}

async function main() {
  await checkDockerComposeExists();
  await deleteTestEnv();
  await createTestEnv();
  await addhedhogModules();
  await startProject();
  console.log('Test project is running!');
}

main().catch((err) => {
  console.error('Error:', err);
});
