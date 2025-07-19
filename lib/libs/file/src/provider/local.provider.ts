import { BadRequestException } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import * as jsonwebtoken from 'jsonwebtoken';
import { join, sep } from 'path';
import { Stream } from 'stream';
import { AbstractProvider } from './abstract,provider';

export class LocalProvider extends AbstractProvider {
  constructor(private setting: Record<string, string>) {
    super();
    this.initValidation();
  }

  async getUrl(path: string): Promise<string> {
    return `${String(process.env.URL)}/file/local/${path}`;
  }

  async initValidation() {
    if (!this.setting['storage-local-path']) {
      throw new BadRequestException(
        `You must set the storage-local-path in the setting.`,
      );
    }

    if (!existsSync(this.setting['storage-local-path'])) {
      await this.createFolderRecursive(this.setting['storage-local-path']);
    }
  }

  async createFolderRecursive(path: string) {
    const folders = join(path).split(sep);
    let currentPath = '';
    for (const folder of folders) {
      currentPath = join(currentPath, folder);
      if (!existsSync(currentPath)) {
        await mkdir(currentPath, { recursive: true });
      }
    }
  }

  async uploadFromString(
    destination: string,
    filename: string,
    fileContent: string,
    mimetype?: string,
  ): Promise<any> {
    const storagePath = join(this.setting['storage-local-path'], destination);

    if (!storagePath) {
      throw new BadRequestException(
        `You must set the storage-local-path in the setting.`,
      );
    }

    if (!existsSync(storagePath)) {
      await this.createFolderRecursive(storagePath);
    }

    if (!existsSync(storagePath)) {
      throw new BadRequestException(
        `The storage path does not exist: ${storagePath}`,
      );
    }

    const filePath = join(storagePath, this.getFilename(filename));

    await writeFile(filePath, fileContent);

    return filePath;
  }

  async upload(destination: string, file: Express.Multer.File): Promise<any> {
    const storagePath = join(this.setting['storage-local-path'], destination);

    if (!storagePath) {
      throw new BadRequestException(
        `You must set the storage-local-path in the setting.`,
      );
    }

    if (!existsSync(storagePath)) {
      await this.createFolderRecursive(storagePath);
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

    return readFile(filepath);
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

      return `http://localhost:5000/file/download/${token}`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
