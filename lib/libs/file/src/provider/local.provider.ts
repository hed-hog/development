import { AbstractProvider } from './abstract,provider';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { BadRequestException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Stream } from 'stream';
import * as jsonwebtoken from 'jsonwebtoken';

export class LocalProvider extends AbstractProvider {
  constructor(private settings: Record<string, string>) {
    super();
  }

  async createForderRecursive(path: string) {
    const folders = path.split('/');
    let currentPath = '';
    for (const folder of folders) {
      currentPath = join(currentPath, folder);
      if (!existsSync(currentPath)) {
        await mkdir(currentPath);
      }
    }
  }

  async upload(destination: string, file: Express.Multer.File): Promise<any> {
    const storagePath = join(this.settings['storage-local-path'], destination);

    if (!storagePath) {
      throw new BadRequestException(
        `You must set the storage-local-path in the settings.`,
      );
    }

    if (!existsSync(storagePath)) {
      await this.createForderRecursive(storagePath);
    }

    if (!existsSync(storagePath)) {
      throw new BadRequestException(
        `The storage path does not exist: ${storagePath}`,
      );
    }
    const filePath = join(storagePath, this.getFilename(file.originalname));

    await writeFile(filePath, file.buffer);

    return filePath;
  }

  async delete(filepath: string): Promise<any> {
    if (!existsSync(filepath)) {
      throw new BadRequestException(`File not found: ${filepath}`);
    }

    return unlink(filepath);
  }

  async readStream(filepath: string): Promise<Stream> {
    return createReadStream(filepath);
  }

  async metaData(filepath: string): Promise<any> {
    if (!existsSync(filepath)) {
      throw new BadRequestException(`File not found: ${filepath}`);
    }

    return {
      size: (await this.buffer(filepath)).length,
    };
  }

  async buffer(filepath: string): Promise<Buffer> {
    if (!existsSync(filepath)) {
      throw new BadRequestException(`File not found: ${filepath}`);
    }

    return createReadStream(filepath).read();
  }

  async tempURL(filepath: string, expires = 3600): Promise<any> {
    try {
      const token = jsonwebtoken.sign(
        { filepath },
        String(process.env.JWT_SECRET),
        {
          expiresIn: expires,
        },
      );

      return `http://localhost:5000/files/download/${token}`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
