import { Storage } from '@google-cloud/storage';
import { BadRequestException } from '@nestjs/common';
import { AbstractProvider } from './abstract,provider';

export class GCSProvider extends AbstractProvider {
  private storage: Storage;

  constructor(private setting: Record<string, string>) {
    super();
    this.initValidation();
  }

  async getUrl(path: string): Promise<string> {
    return `https://storage.googleapis.com/${this.setting['storage-gcs-bucket']}/${path}`;
  }

  async initValidation() {
    if (!this.setting['storage-gcs-keyfile']) {
      throw new BadRequestException(
        `You must set the storage-gcs-keyfile in the setting.`,
      );
    }

    if (!this.setting['storage-gcs-bucket']) {
      throw new BadRequestException(
        `You must set the storage-gcs-bucket in the setting.`,
      );
    }

    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);

    const exists = await bucket.exists();
    if (!exists[0]) {
      throw new BadRequestException(
        `The bucket "${this.setting['storage-gcs-bucket']}" does not exist.`,
      );
    }
  }

  async getClient() {
    if (this.storage) {
      return this.storage;
    }

    return (this.storage = new Storage({
      keyFilename: this.setting['storage-gcs-keyfile'],
    }));
  }

  async uploadFromString(
    destination: string,
    filename: string,
    fileContent: string,
    mimetype?: string,
  ): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(destination + filename);

    return file.save(fileContent, {
      contentType: mimetype,
    });
  }
  async upload(destination: string, file: Express.Multer.File): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const fileObject = bucket.file(destination + file.originalname);

    return fileObject.save(file.buffer, {
      contentType: file.mimetype,
    });
  }
  async readStream(filepath: string): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(filepath);

    return file.createReadStream();
  }
  async delete(filepath: string): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(filepath);

    return file.delete();
  }
  async metaData(filepath: string): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(filepath);

    return file.getMetadata();
  }
  async buffer(filepath: string): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(filepath);

    return file.download();
  }
  async tempURL(filepath: string, expires?: number): Promise<any> {
    const storage = await this.getClient();
    const bucket = storage.bucket(this.setting['storage-gcs-bucket']);
    const file = bucket.file(filepath);

    return file.getSignedUrl({
      action: 'read',
      expires: expires || 60 * 60,
    });
  }
}
