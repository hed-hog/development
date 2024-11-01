import * as fs from 'fs';

export function parseEnv(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo .env não encontrado no caminho: ${filePath}`);
  }

  const envContent = fs.readFileSync(filePath, 'utf-8');
  const envVariables: Record<string, string> = {};

  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');

    if (key && value) {
      envVariables[key.trim()] = expandValue(value.trim(), envVariables);
    }
  });

  return envVariables;
}

function expandValue(
  value: string,
  envVariables: Record<string, string>,
): string {
  return value.replace(/\${(.*?)}/g, (_, varName) => {
    return envVariables[varName] || process.env[varName] || '';
  });
}
