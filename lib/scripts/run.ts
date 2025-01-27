import { spawn } from 'child_process';

export async function run(cwd: string, bin: string, ...args: string[]) {
  return new Promise<void>(async (resolve, reject) => {
    console.log('-'.repeat(32));
    console.log(`\x1b[34m${bin} ${args.join(' ')}\x1b[0m`);
    console.log('-'.repeat(32));
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
