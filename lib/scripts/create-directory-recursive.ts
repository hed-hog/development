import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, sep } from 'path';

export async function createDirectoryRecursive(dirPath: string) {
  const directories = dirPath.split(sep);
  let currentPath = directories[0];

  for (let i = 1; i < directories.length; i++) {
    currentPath = join(currentPath, directories[i]);

    if (!existsSync(currentPath)) {
      mkdir(currentPath);
    }
  }
}
