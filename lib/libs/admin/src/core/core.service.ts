import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

@Injectable()
export class CoreService {
  constructor(private prismaService: PrismaService) {}

  async index() {
    const cpus = os.cpus();
    const totalSpeed = cpus.reduce((acc, cpu) => acc + cpu.speed, 0);
    const averageSpeed = totalSpeed / cpus.length;

    return {
      os: {
        name: this.getFriendlyOSName(),
        platform: os.platform(),
        version: os.release(),
        architecture: os.arch(),
        uptime: os.uptime(),
        cpu: this.getCpuInfo(cpus, averageSpeed),
        memory: this.getMemoryInfo(),
        disk: await this.getDiskInfo(),
      },
      modules: await this.getModulesInfo(),
      users: await this.getUsersInfo(),
      database: await this.getDatabaseInfo(),
    };
  }

  private getFriendlyOSName() {
    switch (os.platform()) {
      case 'aix':
        return `AIX`;
      case 'darwin':
        return `macOS`;
      case 'freebsd':
        return `FreeBSD`;
      case 'linux':
        return `Linux`;
      case 'openbsd':
        return `OpenBSD`;
      case 'sunos':
        return `SunOS`;
      case 'win32':
        return `Windows`;
      default:
        return `Unknown`;
    }
  }

  private async getDatabaseInfo() {
    let connections, size, queriesPerSecond;

    if (process.env.DATABASE_URL.includes('postgres')) {
      [connections, size, queriesPerSecond] = await Promise.all([
        this.prismaService.$queryRaw`SELECT COUNT(*) FROM pg_stat_activity`, // For PostgreSQL
        this.prismaService
          .$queryRaw`SELECT pg_database_size(current_database())`, // For PostgreSQL
        this.prismaService
          .$queryRaw`SELECT sum(numbackends) FROM pg_stat_database`, // For PostgreSQL
      ]);
    } else if (process.env.DATABASE_URL.includes('mysql')) {
      [connections, size, queriesPerSecond] = await Promise.all([
        this.prismaService
          .$queryRaw`SHOW STATUS WHERE variable_name = 'Threads_connected'`, // For MySQL
        this.prismaService
          .$queryRaw`SELECT SUM(data_length + index_length) AS size FROM information_schema.tables WHERE table_schema = DATABASE()`, // For MySQL
        this.prismaService
          .$queryRaw`SHOW STATUS WHERE variable_name = 'Queries'`, // For MySQL
      ]);
    } else {
      throw new Error('Unsupported database type');
    }

    return {
      connections: +String(connections[0].count || connections[0].Value) || 0,
      size: +String(size[0].pg_database_size || size[0].size) || 0,
      queriesPerSecond:
        +String(queriesPerSecond[0].sum || queriesPerSecond[0].Value) || 0,
    };
  }

  private async getUsersInfo() {
    const users = await this.prismaService.user.findMany({
      include: {
        role_user: {
          where: {
            role_id: 1,
          },
          select: {
            role_id: true,
          },
        },
      },
    });

    const activities = await this.prismaService.user_activity.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      take: 10,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        created_at: true,
        message: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return {
      total: users.length,
      admin: users.filter((user) => user.role_user.length > 0).length,
      active: 0,
      activities,
    };
  }

  private async getModulesInfo() {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');

    return new Promise((resolve, reject) => {
      fs.readFile(packageJsonPath, 'utf8', async (err, data) => {
        if (err) {
          reject(`Error reading package.json: ${err.message}`);
          return;
        }

        try {
          const packageJson = JSON.parse(data);
          const dependencies = packageJson.dependencies || {};
          const hedgehogModules = await Promise.all(
            Object.keys(dependencies)
              .filter((key) => key.startsWith('@hedhog'))
              .map(async (key) => {
                const currentVersion = dependencies[key].replace(/^[\^~]/, '');
                const latestVersion = await this.getLatestVersion(key);
                return {
                  name: key,
                  version: dependencies[key],
                  latestVersion,
                  upToDate: currentVersion === latestVersion,
                };
              }),
          );

          resolve(hedgehogModules);
        } catch (parseError: any) {
          reject(`Error parsing package.json: ${parseError?.message}`);
        }
      });
    });
  }

  private async getLatestVersion(moduleName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(`npm show ${moduleName} version`, (error, stdout, stderr) => {
        if (error) {
          reject(
            `Error fetching latest version for ${moduleName}: ${error.message}`,
          );
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      });
    });
  }

  private getCpuInfo(cpus: os.CpuInfo[], averageSpeed: number) {
    return {
      model: cpus[0].model,
      speed: averageSpeed,
      physicalCores: cpus.length / 2, // Assuming hyper-threading, this gives physical cores
      virtualCores: cpus.length,
    };
  }

  private getMemoryInfo() {
    return {
      total: os.totalmem(),
      free: os.freemem(),
    };
  }

  private async getDiskInfo() {
    return new Promise((resolve, reject) => {
      const command = this.getDiskCommand();
      if (!command) {
        reject('Unsupported OS');
        return;
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }

        const diskInfo =
          os.platform() === 'win32'
            ? this.parseWindowsDiskInfo(stdout)
            : this.parseUnixDiskInfo(stdout);
        resolve(diskInfo);
      });
    });
  }

  private getDiskCommand() {
    switch (os.platform()) {
      case 'win32':
        return 'wmic logicaldisk get size,freespace,caption';
      case 'darwin':
      case 'linux':
        return 'df -h';
      default:
        return null;
    }
  }

  private parseWindowsDiskInfo(output: string) {
    const lines = output.trim().split('\n');
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].trim().split(/\s+/);
      if (parts.length === 3) {
        result.push({
          filesystem: parts[0].replace(':', ''),
          size: parseInt(parts[1], 10),
          free: parseInt(parts[2], 10),
        });
      }
    }
    return result;
  }

  private parseUnixDiskInfo(output: string) {
    const lines = output.trim().split('\n');
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(/\s+/);
      if (parts.length >= 6) {
        result.push({
          filesystem: parts[0],
          size: parts[1],
          used: parts[2],
          available: parts[3],
          capacity: parts[4],
          mountpoint: parts[5],
        });
      }
    }
    return result;
  }
}
