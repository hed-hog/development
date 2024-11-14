import { readdir } from 'fs/promises';
import { join } from 'path';
import { run } from './../lib/scripts/run';

async function getDirectoriesPackages() {
  const folders = ['lib'];

  for (const libDir of await readdir('./lib/libs')) {
    folders.push(`lib/libs/${libDir}`);
  }

  return folders;
}

async function main() {
  const folders = await getDirectoriesPackages();

  console.info('Installing admin dependencies...');
  await run(
    join('admin'),
    'npm',
    'i',
    '--legacy-peer-deps',
    '--quiet',
    '--no-audit',
    '--no-fund'
  );
  console.log('Installing backend dependencies...');
  await run(
    join('backend'),
    'npm',
    'i',
    '--legacy-peer-deps',
    '--quiet',
    '--no-audit',
    '--no-fund'
  );

  for (const folder of folders) {
    console.info(`Installing ${folder} dependencies...`);
    await run(
      folder,
      'npm',
      'i',
      '--legacy-peer-deps',
      '--quiet',
      '--no-audit',
      '--no-fund'
    );
  }
}

main().catch((err) => {
  console.error('Error:', err);
});
