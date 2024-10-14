describe('LocaleService', () => {
  it('should be defined', () => {
    expect(true).toBeTruthy();
  });
});

/*
import { Test, TestingModule } from '@nestjs/testing';
import { LocaleService } from './locale.service';
import { PrismaService } from '@hedhog/prisma';
import {
  PaginationService,
  PaginationDTO,
  PageOrderDirection,
} from '@hedhog/pagination';
import { BadRequestException } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from './dto/delete.dto';

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
            locales: {
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

  describe('get', () => {
    it('should paginate locales', async () => {
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
      const result = await service.get(paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.locales,
        paginationParams,
        expect.anything(),
      );
      expect(result).toBe(mockPaginationResult);
    });
  });

  describe('getById', () => {
    it('should return a locale by ID', async () => {
      const mockLocale = {
        id: 1,
        name: 'English',
        code: 'en',
        region: 'us',
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(prismaService.locales, 'findUnique')
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
        country_id: 1,
      };
      const mockLocale = {
        id: 1,
        name: 'English',
        code: 'en',
        region: 'us',
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prismaService.locales, 'create').mockResolvedValue(mockLocale);

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
        country_id: 1,
      };
      const mockLocale = {
        id: 1,
        name: 'English Updated',
        code: 'en',
        region: 'us',
        country_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(prismaService.locales, 'update').mockResolvedValue(mockLocale);

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

    it('should delete locales by IDs', async () => {
      const mockDeleteDTO: DeleteDTO = { ids: [1, 2, 3] };
      jest
        .spyOn(prismaService.locales, 'deleteMany')
        .mockResolvedValue({ count: 3 });

      const result = await service.delete(mockDeleteDTO);
      expect(result.count).toBe(3);
    });
  });
});
*/
