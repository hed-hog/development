import { exec, spawn } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const libsDir = join(__dirname, '..', 'libs');

const directories = readdirSync(libsDir).filter((file) => {
  const fullPath = join(libsDir, file);
  return statSync(fullPath).isDirectory();
});

directories.forEach((dir) => {
  const fullPath = join(libsDir, dir);
  console.log(`Installing dependencies in ${fullPath}...`);

  const childProcess = spawn('npm', ['install'], {
    cwd: fullPath,
    stdio: 'inherit',
    shell: true,
  });

  childProcess.on('exit', (code) => {
    if (code === 0) {
      console.log(`Dependencies in ${fullPath} installed successfully.`);
    } else {
      console.error(`Failed to install dependencies in ${fullPath}.`);
    }
  });
});
