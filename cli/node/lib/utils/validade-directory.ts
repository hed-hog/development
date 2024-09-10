import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export function validateDirectory(dirPath: string): boolean {
  if (existsSync(dirPath)) {
    return true;
  }

  const parentDir = dirname(dirPath);

  mkdirSync(dirPath, { recursive: true });

  if (existsSync(parentDir)) {
    return true;
  } else {
    return false;
  }
}
