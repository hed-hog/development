import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

const getAllProcesses = async (): Promise<{ pid: number; name: string }[]> => {
  return new Promise((resolve, reject) => {
    const processes: { pid: number; name: string }[] = [];

    const ps = spawn('ps', ['-eo', 'pid,comm']);

    ps.stdout.on('data', (data) => {
      const lines = data.toString().trim().split('\n').slice(1);
      for (const line of lines) {
        const [pidStr, ...nameParts] = line.trim().split(/\s+/);
        const pid = parseInt(pidStr, 10);
        const name = nameParts.join(' ');
        processes.push({ pid, name });
      }
    });

    ps.on('close', () => resolve(processes));
    ps.on('error', (err) => reject(err));
  });
};

const processInDirectory = (
  pid: number,
  directory: string,
): Promise<boolean> => {
  return new Promise((resolve) => {
    const procPath = `/proc/${pid}/cwd`;

    fs.readlink(procPath, (err, link) => {
      if (err) {
        resolve(false);
      } else {
        resolve(link.startsWith(directory));
      }
    });
  });
};

const killProcess = (pid: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const kill = spawn('kill', ['-9', pid.toString()]);
    kill.on('close', () => resolve());
    kill.on('error', (err) => reject(err));
  });
};

export const killProcessesInDirectory = async (
  directory: string,
): Promise<void> => {
  const processes = await getAllProcesses();

  for (const { pid, name } of processes) {
    if (await processInDirectory(pid, directory)) {
      await killProcess(pid);
      console.log(`Killed process "${name}" with ID: ${pid}`);
    }
  }

  const items = fs.readdirSync(directory);
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      await killProcessesInDirectory(itemPath);
    }
  }
};

(async () => {
  const targetDirectory = process.argv[2];
  if (!targetDirectory) {
    console.error('Please, provide a valid directory.');
    process.exit(1);
  }

  try {
    await killProcessesInDirectory(targetDirectory);
    console.log('All process have been killed succesfully.');
  } catch (error) {
    console.error('Error trying to kill the processes:', error);
  }
})();
