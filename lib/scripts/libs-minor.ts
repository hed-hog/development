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

async function updateHedhogDeps(path: string) {
  console.info(`Updating ${path}...`);
  const packagePath = join(__dirname, '..', path, 'package.json');
  console.info(`Reading ${packagePath}...`);

  if (existsSync(packagePath)) {
    const packageJson = require(packagePath);

    const { dependencies = {}, devDependencies = {} } = packageJson;

    const devDeps = Object.keys(devDependencies)
      .filter((dep) => dep.split('/')[0] === '@hedhog')
      .map((dep) => `${dep}@latest`);
    const deps = Object.keys(dependencies)
      .filter((dep) => dep.split('/')[0] === '@hedhog')
      .map((dep) => `${dep}@latest`);

    if (devDeps.length) {
      console.info(`Installing devDependencies: ${devDeps}`);

      await run(path, 'npm', 'i', '-D', ...devDeps, '--legacy-peer-deps');
    }

    if (deps.length) {
      console.info(`Installing deps: ${deps}`);

      await run(path, 'npm', 'i', ...deps, '--legacy-peer-deps');
    }

    console.info(`Updated!`);
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
  const packagePath = join(__dirname, '..', path, 'package.json');
  if (existsSync(packagePath)) {
    const packageJson = require(packagePath);

    packageJson.version = version;

    await writeFile(packagePath, JSON.stringify(packageJson, null, 2));
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
) {
  if (Object.keys(libs).length > countUpdated) {
    const result = await getNextLibToUpdate(libs, updatedLibs);

    if (result) {
      const [name, version] = result;

      if (name) {
        console.log('Update lib', name, version, '->', toVersion);

        const path = join(__dirname, '..', 'libs', name);

        await updateHedhogDeps(path);
        await updateVersionLib(path, toVersion);
        await deployLib(path);

        updatedLibs[name] = version;
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

  await updateLibs(libs, initialDeps, `${major}.${minor + 1}.0`);
}

main().then(() => {
  console.info();
  console.log('✅ ', 'done');
});
