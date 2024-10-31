import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdateDTO } from './dto/update.dto';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocaleService,
        {
          provide: PrismaService,
          useValue: {
            translations: {
              findMany: jest.fn(),
            },
            locale: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocaleService>(LocaleService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTranslations', () => {
    it('should throw BadRequestException when localeCode is not provided', async () => {
      await expect(service.getTranslations('', 'namespace')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return translations for a given localeCode and namespace', async () => {
      const mockTranslations = [
        {
          id: 1,
          locale_id: 1,
          namespace_id: 1,
          name: 'hello',
          value: 'Hello',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest
        .spyOn(prismaService.translations, 'findMany')
        .mockResolvedValue(mockTranslations);

      const result = await service.getTranslations('en-US', 'namespace');
      expect(result).toEqual({ hello: 'Hello' });
    });
  });
  /*
  describe('get', () => {
    it('should paginate locale', async () => {
      const mockPaginationResult = {
        data: [],
        total: 10,
        lastPage: 1,
        page: 1,
        prev: 0,
        next: 2,
        pageSize: 10,
      };
      jest
        .spyOn(paginationService, 'paginate')
        .mockResolvedValue(mockPaginationResult);

      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 20,
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
        search: '',
      };
      const result = await service.get(paginationParams );

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.locale,
        paginationParams,
        expect.anything(),
      );
      expect(result).toBe(mockPaginationResult);
    });
  });
*/
  describe('getById', () => {
    it('should return a locale by ID', async () => {
      const mockLocale = {
        id: 1,
        name: 'English',
        code: 'en',
        region: 'us',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(prismaService.locale, 'findUnique')
        .mockResolvedValue(mockLocale);

      const result = await service.getById(1);
      expect(result).toBe(mockLocale);
    });
  });

  describe('create', () => {
    it('should create a new locale', async () => {
      const mockCreateDTO: CreateDTO = {
        name: 'English',
        code: 'en',
        region: 'us',
      };
      const mockLocale = {
        id: 1,
        name: 'English',
        code: 'en',
        region: 'us',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prismaService.locale, 'create').mockResolvedValue(mockLocale);

      const result = await service.create(mockCreateDTO);
      expect(result).toBe(mockLocale);
    });
  });

  describe('update', () => {
    it('should update a locale', async () => {
      const mockUpdateDTO: UpdateDTO = {
        name: 'English Updated',
        code: 'en',
        region: 'us',
      };
      const mockLocale = {
        id: 1,
        name: 'English Updated',
        code: 'en',
        region: 'us',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prismaService.locale, 'update').mockResolvedValue(mockLocale);

      const result = await service.update({ id: 1, data: mockUpdateDTO });
      expect(result).toBe(mockLocale);
    });
  });

  describe('delete', () => {
    it('should throw BadRequestException if no IDs are provided', async () => {
      await expect(service.delete({ ids: null })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should delete locale by IDs', async () => {
      const mockDeleteDTO: DeleteDTO = { ids: [1, 2, 3] };
      jest
        .spyOn(prismaService.locale, 'deleteMany')
        .mockResolvedValue({ count: 3 });

      const result = await service.delete(mockDeleteDTO);
      expect(result.count).toBe(3);
    });
  });
});
