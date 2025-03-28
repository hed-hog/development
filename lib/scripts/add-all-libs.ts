import { readdir } from 'fs/promises';
import { join } from 'path';
import { run } from './run';

async function main() {
  process.env.HEDHOG_SKIP_TYPES = '1';

  await run(process.cwd(), 'hedhog', 'reset');

  const libs = (await readdir(join(process.cwd(), 'libs'))).filter(
    (lib) =>
      ![
        'cbc',
        'admin',
        'contact',
        'country',
        'file',
        'locale',
        'mail',
        'pagination',
        'payment',
        'prisma',
        'setting',
      ].includes(lib),
  );
  for (const lib of libs) {
    console.log(`Adding lib: ${lib}`);
    await run(process.cwd(), 'hedhog', 'add', lib);
    console.log(`\x1b[32mLib added: ${lib}\x1b[0m`);
  }

  delete process.env.HEDHOG_SKIP_TYPES;

  await run(process.cwd(), 'npm', 'run', 'create:types');
}

main();
