import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { PrismaService } from '@hedhog/prisma';
import {
  PaginationService,
  PaginationDTO,
  PageOrderDirection,
} from '@hedhog/pagination';
import { BadRequestException } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '../dto/delete.dto';

describe('SettingsService', () => {
  let service: SettingsService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: PrismaService,
          useValue: {
            settings: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
            createInsensitiveSearch: jest.fn(),
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

    service = module.get<SettingsService>(SettingsService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSettings', () => {
    it('should return paginated settings', async () => {
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      const mockPaginatedData = {
        data: [],
        total: 10,
        lastPage: 1,
        page: 1,
        prev: 0,
        next: 2,
        pageSize: 10,
      };

      jest.spyOn(prismaService, 'createInsensitiveSearch').mockReturnValue([]);
      jest
        .spyOn(paginationService, 'paginate')
        .mockResolvedValue(mockPaginatedData);

      const result = await service.getSettings(paginationParams);

      expect(prismaService.createInsensitiveSearch).toHaveBeenCalledWith(
        ['name'],
        paginationParams,
      );
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.settings,
        paginationParams,
        { where: { OR: [] } },
      );
      expect(result).toEqual(mockPaginatedData);
    });
  });

  describe('get', () => {
    it('should return a specific setting by ID', async () => {
      const mockSetting = {
        id: 1,
        name: 'Test Setting',
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(prismaService.settings, 'findUnique')
        .mockResolvedValue(mockSetting);

      const result = await service.get(1);

      expect(prismaService.settings.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockSetting);
    });
  });

  describe('create', () => {
    it('should create a new setting', async () => {
      const createDTO: CreateDTO = { name: 'New Setting' };
      const mockSetting = {
        id: 1,
        name: 'Test Setting',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest
        .spyOn(prismaService.settings, 'create')
        .mockResolvedValue(mockSetting);

      const result = await service.create(createDTO);

      expect(prismaService.settings.create).toHaveBeenCalledWith({
        data: { name: createDTO.name },
      });
      expect(result).toEqual(mockSetting);
    });
  });

  describe('update', () => {
    it('should update an existing setting', async () => {
      const updateDTO: UpdateDTO = { name: 'Updated Setting' };
      const updateInput = { id: 1, data: updateDTO };
      const mockSetting = {
        id: 1,
        name: 'Update Setting',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest
        .spyOn(prismaService.settings, 'update')
        .mockResolvedValue(mockSetting);

      const result = await service.update(updateInput);

      expect(prismaService.settings.update).toHaveBeenCalledWith({
        where: { id: updateInput.id },
        data: updateInput.data,
      });
      expect(result).toEqual(mockSetting);
    });
  });

  describe('delete', () => {
    it('should throw an error if no ids are provided', async () => {
      const deleteDTO: DeleteDTO = { ids: null };

      await expect(service.delete(deleteDTO)).rejects.toThrow(
        new BadRequestException(
          `You must select at least one setting to delete.`,
        ),
      );
    });

    it('should delete settings by ids', async () => {
      const deleteDTO: DeleteDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.settings, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await service.delete(deleteDTO);

      expect(prismaService.settings.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: deleteDTO.ids } },
      });
    });
  });
});
