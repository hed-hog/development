import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { DeleteDTO } from './dto/delete.dto';
import { AbstractProvider } from './provider/abstract,provider';
import { SettingsService } from '@hedhog/admin';
import { ProviderFactory } from './provider/provider.factory';
import { JwtService } from '@nestjs/jwt';
import { EnumProvider } from './provider/provider.enum';

@Injectable()
export class FileService {
  private providerId: number;
  private mimetypes: Record<string, number> = {};
  private settings: Record<string, string>;

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  async getProvider(): Promise<AbstractProvider> {
    this.settings = await this.settingsService.getSettingValues([
      'storage',
      'storage-local-path',
      'storage-s3-key',
      'storage-s3-secret',
      'storage-s3-region',
      'storage-s3-bucket',
      'storage-max-size',
      'storage-accept-mimetypes',
      'storage-abs-account',
      'storage-abs-key',
      'storage-abs-container',
    ]);

    if (!this.settings['storage']) {
      throw new BadRequestException(
        `You must set the storage provider in the settings.`,
      );
    }

    const providerName = this.settings['storage'];
    const provider = ProviderFactory.create(
      providerName as EnumProvider,
      this.settings,
    );

    const providerData = await this.prismaService.file_providers.findFirst({
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

    let result = await this.prismaService.file_mimetypes.findFirst({
      where: {
        name: mimetype,
      },
    });

    if (!result) {
      result = this.prismaService.file_mimetypes.create({
        data: {
          name: mimetype,
        },
      });
    }

    return (this.mimetypes[mimetype] = result.id);
  }

  async acceptMimetypes(mimetype: string) {
    if (!this.settings || !this.settings['storage-accept-mimetypes']) {
      await this.getProvider();
    }

    const acceptMimetypes = this.settings['storage-accept-mimetypes'];

    return acceptMimetypes.split(',').indexOf(mimetype) !== -1;
  }

  async maxFileSize(size: number) {
    if (!this.settings || !this.settings['storage-max-size']) {
      await this.getProvider();
    }

    const maxSize = this.settings['storage-max-size'];

    return size <= Number(maxSize);
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

    const file = await this.prismaService.files.create({
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
    const files = await this.prismaService.files.findMany({
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

      await this.prismaService.files.delete({
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
      this.prismaService.files,
      paginationParams,
      {
        where: {
          OR,
        },
      },
    );
  }

  async get(fileId: number) {
    return this.prismaService.files.findUnique({
      where: { id: fileId },
    });
  }

  async download(token: string) {
    const { filepath } = this.jwtService.verify(token);
    return (await this.getProvider()).readStream(filepath);
  }

  async tempURL(filepath: string, expires = 3600) {
    return (await this.getProvider()).tempURL(filepath, expires);
  }
}
