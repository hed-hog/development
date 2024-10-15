import { spawn } from 'child_process';

export async function run(cwd: string, bin: string, ...args: string[]) {
  console.log(`Running ${bin} ${args.join(' ')}`, {
    cwd,
  });
  return new Promise<void>(async (resolve, reject) => {
    const child = spawn(bin, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}
