import chalk from 'chalk';
import { existsSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import { get } from 'https';
import { join } from 'path';
import { run } from './run';

type Lib = {
  dependencies: string[];
  version: number[];
};

type Libs = Record<string, Lib>;

async function updateHedhogDeps(path: string, tries = 0) {
  try {
    console.log('*'.repeat(32));
    console.info(`\x1b[36mUpdating ${path} for ${tries} time...\x1b[0m`);
    console.log('*'.repeat(32));

    console.log('Cleaning node_modules and package-lock.json...');
    await run(
      path,
      'npx',
      'rimraf',
      'node_modules',
      'package-lock.json',
      'dist',
    );

    const packagePath = join(path, 'package.json');
    console.info(`Reading ${packagePath}...`);

    if (existsSync(packagePath)) {
      const packageJson = require(packagePath);

      const { dependencies = {}, devDependencies = {} } = packageJson;

      const devDeps = Object.keys(devDependencies).filter(
        (dep) => dep.split('/')[0] === '@hedhog',
      );

      for (let i = 0; i < devDeps.length; i++) {
        devDeps[i] =
          devDeps[i] +
          '@' +
          (await getVersionFromNpmRegistry(devDeps[i])).join('.');
      }

      const deps = Object.keys(dependencies).filter(
        (dep) => dep.split('/')[0] === '@hedhog',
      );

      for (let i = 0; i < deps.length; i++) {
        deps[i] =
          deps[i] + '@' + (await getVersionFromNpmRegistry(deps[i])).join('.');
      }

      console.log('Cleaning cache...');
      await run(path, 'npm', 'cache', 'clean', '--force');

      if (devDeps.length) {
        console.info(`Installing devDependencies: ${devDeps}`);

        for (const dep of devDeps) {
          console.info(`Installing ${dep}...`);
          await run(
            path,
            'npm',
            'i',
            '-D',
            dep,
            '--legacy-peer-deps',
            '--ignore-scripts',
          );
        }
      }

      if (deps.length) {
        console.info(`Installing deps: ${deps}`);

        for (const dep of deps) {
          console.info(`Installing ${dep}...`);
          await run(
            path,
            'npm',
            'i',
            dep,
            '--legacy-peer-deps',
            '--ignore-scripts',
          );
        }
      }

      console.info(`Checking for updates...`);

      await run(path, 'npm', 'i', '--legacy-peer-deps', '--ignore-scripts');

      console.info(`Updated!`);
    } else {
      console.warn(chalk.yellow(`File ${packagePath} not found`));
    }
  } catch (error) {
    console.error(`\x1b[31mError updating ${path}\x1b[0m`);
    console.error(error);
    /*
    if (tries < 6) {
      console.info(`Retrying...`);
      setTimeout(async () => {
        await updateHedhogDeps(path, tries + 1);
      }, 10000);
    }*/
  }
}

async function getVersionFromNpmRegistry(
  packageName: string,
): Promise<number[]> {
  console.info(`Getting version of ${packageName} from npm registry...`);

  return new Promise<any>((resolve, reject) => {
    get(`https://registry.npmjs.org/${packageName}`, (resp) => {
      let data = '';

      // Recebendo partes dos dados
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // Quando todos os dados forem recebidos
      resp.on('end', () => {
        try {
          resolve(JSON.parse(data)['dist-tags'].latest.split('.').map(Number));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function loadLibs() {
  const libs: Libs = {};
  const libsPath = join(__dirname, '..', 'libs');
  let minor = 0;
  let major = 0;

  for (const dir of await readdir(libsPath)) {
    let libExists = false;
    let version = [0, 0, 0];
    const dependencies = [];
    const packageJsonPath = join(libsPath, dir, 'package.json');
    if (existsSync(packageJsonPath)) {
      libExists = true;
      const packageJson = require(packageJsonPath);
      version = packageJson.version.split('.').map(Number);

      if (minor < Number(version[1])) {
        minor = Number(version[1]);
      }

      if (major < Number(version[0])) {
        major = Number(version[0]);
      }

      if (packageJson.dependencies) {
        for (const dep of Object.keys(packageJson.dependencies)) {
          if (dep.startsWith('@hedhog/')) {
            dependencies.push(dep.split('/')[1]);
          }
        }
      }
      if (packageJson.devDependencies) {
        for (const dep of Object.keys(packageJson.devDependencies)) {
          if (dep.startsWith('@hedhog/')) {
            dependencies.push(dep.split('/')[1]);
          }
        }
      }
    }

    if (libExists) {
      libs[dir] = {
        dependencies,
        version,
      };
    }
  }

  return {
    libs,
    minor,
    major,
  };
}

async function getNextLibToUpdate(
  libs: Libs,
  updatedLibs: Record<string, number[]>,
): Promise<[string, number[]]> {
  console.info('==========================');
  console.info(
    'libs restantes: ',
    Object.keys(libs).filter((name) => {
      return !updatedLibs[name];
    }),
  );
  console.info('==========================');

  for (const lib of Object.keys(libs).filter((name) => !updatedLibs[name])) {
    const { dependencies, version } = libs[lib];

    let count = 0;
    for (const dep of dependencies) {
      if (!updatedLibs[dep]) {
        count++;
      }
    }

    if (count === 0) {
      return [lib, version];
    }
  }
}

async function updateVersionLib(path: string, version: string) {
  const packagePath = join(path, 'package.json');
  if (existsSync(packagePath)) {
    const packageJson = require(packagePath);

    packageJson.version = version;

    await writeFile(packagePath, JSON.stringify(packageJson, null, 2));
  } else {
    console.warn(chalk.yellow(`File ${packagePath} not found`));
  }
}

async function deployLib(path: string) {
  console.log('Deploying lib', path);

  await run(path, 'npm', 'run', 'prod');
}

async function updateLibs(
  libs: Libs,
  updatedLibs: Record<string, number[]>,
  toVersion: string,
  countUpdated = 0,
  tries = 0,
) {
  if (Object.keys(libs).length > countUpdated) {
    const result = await getNextLibToUpdate(libs, updatedLibs);

    if (result) {
      const [name, version] = result;

      if (name) {
        try {
          console.log('*'.repeat(32));
          console.info(`\x1b[33m[${name}]\x1b[0m`);
          console.log('*'.repeat(32));
          console.log('Update lib', name, version, '->', toVersion);

          const path = join(__dirname, '..', 'libs', name);

          await updateHedhogDeps(path);
          await updateVersionLib(path, toVersion);
          await deployLib(path);

          updatedLibs[name] = version;
        } catch (error) {
          console.error(`\x1b[31mError updating lib ${name}\x1b[0m`);
          console.error(error);
          /*
          if (tries < 6) {
            console.info(`Retrying...`);
            setTimeout(async () => {
              await updateLibs(
                libs,
                updatedLibs,
                toVersion,
                countUpdated,
                tries + 1,
              );
            }, 10000);
          }*/
        }
      }
    }

    await updateLibs(libs, updatedLibs, toVersion, countUpdated + 1);
  } else {
    console.log('All libs are updated');
  }
}

async function main() {
  const { major, minor, libs } = await loadLibs();

  const initialDeps = {
    core: await getVersionFromNpmRegistry('@hedhog/core'),
    utils: await getVersionFromNpmRegistry('@hedhog/utils'),
  };

  console.log({ initialDeps });

  await updateLibs(libs, initialDeps, `${major}.${minor + 1}.0`);
}

main().then(() => {
  console.info('==========================');
  console.info();
  console.info('✅ ', 'DONE!');
  console.info();
  console.info('==========================');
});
