import { SettingService } from '@hedhog/admin';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeleteDTO } from './dto/delete.dto';
import { AbstractProvider } from './provider/abstract,provider';
import { EnumProvider } from './provider/provider.enum';
import { ProviderFactory } from './provider/provider.factory';

@Injectable()
export class FileService implements OnModuleInit {
  private providerId: number;
  private mimetypes: Record<string, number> = {};
  private setting: Record<string, string>;

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.getProvider();
  }

  async getStorage() {
    return this.setting['storage'];
  }

  async getProvider(): Promise<AbstractProvider> {
    this.setting = await this.settingService.getSettingValues([
      'storage',
      'storage-local-path',
      'storage-s3-key',
      'storage-s3-secret',
      'storage-s3-region',
      'storage-s3-bucket',
      'storage-max-size',
      'storage-accept-mimetype',
      'storage-abs-account',
      'storage-abs-key',
      'storage-abs-container',
      'storage-gcs-keyfile',
    ]);

    if (!this.setting['storage']) {
      throw new BadRequestException(
        `You must set the storage provider in the setting.`,
      );
    }

    const providerName = this.setting['storage'];
    const provider = ProviderFactory.create(
      providerName as EnumProvider,
      this.setting,
    );

    const providerData = await this.prismaService.file_provider.findFirst({
      where: {
        slug: providerName,
      },
      select: {
        id: true,
      },
    });

    if (!providerData) {
      throw new BadRequestException(`Provider ${providerName} not found.`);
    }

    this.providerId = providerData.id;

    return provider;
  }

  async getMimeType(mimetype: string) {
    if (this.mimetypes[mimetype]) {
      return this.mimetypes[mimetype];
    }

    let result = await this.prismaService.file_mimetype.findFirst({
      where: {
        name: mimetype,
      },
    });

    if (!result) {
      result = await this.prismaService.file_mimetype.create({
        data: {
          name: mimetype,
        },
      });
    }

    return (this.mimetypes[mimetype] = result.id);
  }

  async acceptMimetypes(mimetype: string) {
    if (!this.setting || !this.setting['storage-accept-mimetype']) {
      await this.getProvider();
    }
    const acceptMimetypes = this.setting['storage-accept-mimetype'];
    return acceptMimetypes.split(',').indexOf(mimetype) !== -1;
  }

  async maxFileSize(size: number) {
    if (!this.setting || !this.setting['storage-max-size']) {
      await this.getProvider();
    }

    const maxSize = this.setting['storage-max-size'];

    return size <= Number(maxSize);
  }

  async uploadFromString(
    destination: string,
    filename: string,
    filecontent: string,
    mimetype = 'text/plain',
  ) {
    const provider = await this.getProvider();

    if (!(await this.acceptMimetypes(mimetype))) {
      throw new BadRequestException(`Invalid file type: ${mimetype}`);
    }

    const url = await provider.uploadFromString(
      destination,
      filename,
      filecontent,
      mimetype,
    );

    const file = await this.prismaService.file.create({
      data: {
        filename,
        path: url,
        provider_id: this.providerId,
        location: destination,
        mimetype_id: await this.getMimeType(mimetype),
        size: filecontent.length,
      },
    });

    return file;
  }

  async upload(destination: string, fileBuffer: Express.Multer.File) {
    const provider = await this.getProvider();

    if (!(await this.acceptMimetypes(fileBuffer.mimetype))) {
      throw new BadRequestException(
        `Invalid file type: ${fileBuffer.mimetype}`,
      );
    }

    if (!(await this.maxFileSize(fileBuffer.size))) {
      throw new BadRequestException(`File too large: ${fileBuffer.size} bytes`);
    }

    const url = await provider.upload(destination, fileBuffer);

    const file = await this.prismaService.file.create({
      data: {
        filename: fileBuffer.originalname,
        path: url,
        provider_id: this.providerId,
        location: destination,
        mimetype_id: await this.getMimeType(fileBuffer.mimetype),
        size: fileBuffer.size,
      },
    });

    return file;
  }

  async delete({ ids }: DeleteDTO) {
    const files = await this.prismaService.file.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        path: true,
      },
    });

    for (const file of files) {
      await (await this.getProvider()).delete(file.path);

      await this.prismaService.file.delete({
        where: {
          id: file.id,
        },
      });
    }

    return files.map((file) => file.id);
  }

  async getFiles(paginationParams: PaginationDTO) {
    const fields = ['filename', 'path'];
    const OR = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams,
    );

    return this.paginationService.paginate(
      this.prismaService.file,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(fileId: number) {
    return this.prismaService.file.findUnique({
      where: { id: fileId },
    });
  }

  async readStream(filepath: string) {
    return (await this.getProvider()).readStream(filepath);
  }

  async download(token: string) {
    const { filepath } = this.jwtService.verify(token);
    return (await this.getProvider()).readStream(filepath);
  }

  async tempURL(filepath: string, expires = 3600) {
    return (await this.getProvider()).tempURL(filepath, expires);
  }
}
