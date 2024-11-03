import * as fs from 'fs';

let envVarsCache: any = {};

function removeQuotes(value: string): string {
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    value = value.slice(1, -1);
  }

  return value;
}

export function parseEnv(filePath: string): Record<string, string> {
  if (envVarsCache[filePath]) {
    return envVarsCache[filePath];
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo .env não encontrado no caminho: ${filePath}`);
  }

  const envContent = fs.readFileSync(filePath, 'utf-8');
  const envVariables: Record<string, string> = {};

  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');

    if (key && value) {
      envVariables[key.trim()] = removeQuotes(
        expandValue(value.trim(), envVariables),
      );
    }
  });

  return (envVarsCache[filePath] = envVariables);
}

function expandValue(
  value: string,
  envVariables: Record<string, string>,
): string {
  return value.replace(/\${(.*?)}/g, (_, varName) => {
    return envVariables[varName] || process.env[varName] || '';
  });
}
