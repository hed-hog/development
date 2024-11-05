import { readdir } from 'fs/promises';
import { join } from 'path';
import { run } from './../lib/scripts/run';

async function getDirectoriesPackages() {
    const folders = ['lib']

    for (const libDir of await readdir('./lib/libs')) {
        folders.push(`lib/libs/${libDir}`)
    }

    return folders
}

async function updateHedhogDeps(path: string) {
    console.info(`Updating ${path}...`);
    const packagePath = join(__dirname, '..', path, 'package.json');
    console.info(`Reading ${packagePath}...`);
    const packageJson = require(packagePath);

    const {dependencies = {}, devDependencies = {}} = packageJson;

    const devDeps = Object.keys(devDependencies).filter(dep => dep.split('/')[0] === '@hedhog').map((dep) => `${dep}@latest`)
    const deps = Object.keys(dependencies).filter(dep => dep.split('/')[0] === '@hedhog').map((dep) => `${dep}@latest`)

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

async function main() {
    
    const folders = await getDirectoriesPackages();
    
    for (const folder of folders) {
        await updateHedhogDeps(folder)
    }

}

main().catch((err) => {
    console.error('Error:', err);
});
  