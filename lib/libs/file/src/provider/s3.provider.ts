import { BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AbstractProvider } from './abstract,provider';

export class S3Provider extends AbstractProvider {
  private S3: S3;

  constructor(private setting: Record<string, string>) {
    super();
    this.initValidation();
  }

  async initValidation() {
    if (!this.setting['storage-s3-key']) {
      throw new BadRequestException(
        `You must set the storage-s3-key in the setting.`,
      );
    }

    if (!this.setting['storage-s3-secret']) {
      throw new BadRequestException(
        `You must set the storage-s3-secret in the setting.`,
      );
    }

    if (!this.setting['storage-s3-region']) {
      throw new BadRequestException(
        `You must set the storage-s3-region in the setting.`,
      );
    }

    if (!this.setting['storage-s3-bucket']) {
      throw new BadRequestException(
        `You must set the storage-s3-bucket in the setting.`,
      );
    }

    const s3 = await this.getClient();

    try {
      await s3
        .headBucket({
          Bucket: this.setting['storage-s3-bucket'],
        })
        .promise();
    } catch (error) {
      throw new BadRequestException(
        `The bucket "${this.setting['storage-s3-bucket']}" does not exist or you do not have access to it.`,
      );
    }
  }

  async getClient() {
    if (this.S3) {
      return this.S3;
    }

    return (this.S3 = new S3({
      credentials: {
        accessKeyId: this.setting['storage-s3-key'],
        secretAccessKey: this.setting['storage-s3-secret'],
      },
      region: this.setting['storage-s3-region'],
    }));
  }

  async uploadFromString(
    destination: string,
    filename: string,
    fileContent: string,
  ): Promise<any> {
    const s3 = await this.getClient();

    const result = await s3
      .upload({
        Bucket: this.setting['storage-s3-bucket'],
        Key: [destination, this.getFilename(filename)].join('/'),
        Body: fileContent,
      })
      .promise();

    return result['Location'];
  }

  async upload(destination: string, file: Express.Multer.File): Promise<any> {
    const s3 = await this.getClient();

    const result = await s3
      .upload({
        Bucket: this.setting['storage-s3-bucket'],
        Key: [destination, this.getFilename(file.originalname)].join('/'),
        Body: file.buffer,
      })
      .promise();

    return result['Location'];
  }

  async delete(filepath: string): Promise<any> {
    const s3 = await this.getClient();

    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    await s3
      .deleteObject({
        Bucket: this.setting['storage-s3-bucket'],
        Key: url.pathname.split('/').slice(1).join('/'),
      })
      .promise();

    return true;
  }

  async readStream(filepath: string): Promise<any> {
    const s3 = await this.getClient();

    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    return s3
      .getObject({
        Bucket: this.setting['storage-s3-bucket'],
        Key: url.pathname.split('/').slice(1).join('/'),
      })
      .createReadStream();
  }

  async metaData(filepath: string): Promise<any> {
    const s3 = await this.getClient();

    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    const result = await s3
      .headObject({
        Bucket: this.setting['storage-s3-bucket'],
        Key: url.pathname.split('/').slice(1).join('/'),
      })
      .promise();

    return {
      size: result.ContentLength,
    };
  }

  async buffer(filepath: string): Promise<any> {
    const s3 = await this.getClient();

    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    const result = await s3
      .getObject({
        Bucket: this.setting['storage-s3-bucket'],
        Key: url.pathname.split('/').slice(1).join('/'),
      })
      .promise();

    return result.Body;
  }

  async tempURL(filepath: string, expires = 3600): Promise<any> {
    const s3 = await this.getClient();

    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.setting['storage-s3-bucket'],
      Key: url.pathname.split('/').slice(1).join('/'),
      Expires: expires,
    });
  }
}
