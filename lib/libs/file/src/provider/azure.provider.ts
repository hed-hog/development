import {
  BlobServiceClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { BadRequestException } from '@nestjs/common';
import { AbstractProvider } from './abstract,provider';

export class AzureProvider extends AbstractProvider {
  constructor(private setting: Record<string, string>) {
    super();
    this.initValidation();
  }

  async initValidation() {
    if (!this.setting['storage-abs-account']) {
      throw new BadRequestException(
        `You must set the storage-abs-account in the setting.`,
      );
    }

    if (!this.setting['storage-abs-key']) {
      throw new BadRequestException(
        `You must set the storage-abs-key in the setting.`,
      );
    }

    if (!this.setting['storage-abs-container']) {
      throw new BadRequestException(
        `You must set the storage-abs-container in the setting.`,
      );
    }

    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );

    const exists = await containerClient.exists();
    if (!exists) {
      throw new BadRequestException(
        `The container "${this.setting['storage-abs-container']}" does not exist.`,
      );
    }
  }

  async getClient() {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      this.setting['storage-abs-account'],
      this.setting['storage-abs-key'],
    );
    const blobServiceClient = new BlobServiceClient(
      `https://${this.setting['storage-abs-account']}.blob.core.windows.net`,
      sharedKeyCredential,
    );
    return blobServiceClient;
  }

  async uploadFromString(
    destination: string,
    filename: string,
    fileContent: string,
    mimetype = 'text/plain',
  ): Promise<any> {
    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const filepath = [destination, this.getFilename(filename)].join('/');
    const blobClient = containerClient.getBlockBlobClient(filepath);

    await blobClient.upload(fileContent, fileContent.length, {
      blobHTTPHeaders: { blobContentType: mimetype },
    });
    return `https://${this.setting['storage-abs-container']}.azureedge.net/${filepath}`;
  }

  async upload(destination: string, file: Express.Multer.File): Promise<any> {
    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const filepath = [destination, this.getFilename(file.originalname)].join(
      '/',
    );
    const blobClient = containerClient.getBlockBlobClient(filepath);

    await blobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });
    return `https://${this.setting['storage-abs-container']}.azureedge.net/${filepath}`;
  }

  async delete(filepath: string): Promise<any> {
    const url = new URL(filepath);

    if (!url.pathname) {
      throw new Error(`Invalid filepath "${filepath}" for S3`);
    }

    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const blobClient = containerClient.getBlockBlobClient(
      url.pathname.split('/').slice(1).join('/'),
    );

    return await blobClient.delete();
  }

  async readStream(filepath: string): Promise<any> {
    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const blobClient = containerClient.getBlockBlobClient(filepath);

    const downloadBlockBlobResponse = await blobClient.download();
    return downloadBlockBlobResponse.readableStreamBody;
  }

  async metaData(filepath: string): Promise<any> {
    const blobServiceClient = await this.getClient();
    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const blobClient = containerClient.getBlockBlobClient(filepath);

    const properties = await blobClient.getProperties();
    return properties;
  }
  async buffer(filepath: string): Promise<any> {
    const blobServiceClient = await this.getClient();

    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );

    const blobClient = containerClient.getBlockBlobClient(filepath);

    const buffer = await blobClient.downloadToBuffer();

    return buffer;
  }
  async tempURL(filepath: string, expires?: number): Promise<any> {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      this.setting['storage-abs-account'],
      this.setting['storage-abs-key'],
    );
    const blobServiceClient = new BlobServiceClient(
      `https://${this.setting['storage-abs-account']}.blob.core.windows.net`,
      sharedKeyCredential,
    );

    const containerClient = blobServiceClient.getContainerClient(
      this.setting['storage-abs-container'],
    );
    const blobClient = containerClient.getBlobClient(filepath);

    const expiresOn = new Date(new Date().getTime() + expires * 1000);
    const blobSAS = generateBlobSASQueryParameters(
      {
        containerName: this.setting['storage-abs-container'],
        blobName: filepath,
        permissions: ContainerSASPermissions.parse('r'),
        expiresOn,
      },
      sharedKeyCredential,
    ).toString();
    return blobClient.url + '?' + blobSAS;
  }
}
