import * as os from 'os';
import { execSync } from 'child_process';

export function getScreenSize() {
  let width, height;

  // Verifica o sistema operacional
  if (os.platform() === 'win32') {
    // Comando para obter a resolução da tela no Windows
    const resolution = execSync(
      'wmic path Win32_VideoController get CurrentHorizontalResolution,CurrentVerticalResolution',
    )
      .toString()
      .split('\n')[1]
      .trim()
      .split(/\s+/);
    width = parseInt(resolution[0], 10);
    height = parseInt(resolution[1], 10);
  } else if (os.platform() === 'linux') {
    // Comando para obter a resolução da tela no Ubuntu/Linux
    const resolution = execSync('xrandr | grep "\\*"')
      .toString()
      .trim()
      .split(/\s+/)[0]
      .split('x');
    width = parseInt(resolution[0], 10);
    height = parseInt(resolution[1], 10);
  }

  return { width, height };
}
