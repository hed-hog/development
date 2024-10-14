import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { PrismaService } from '@hedhog/prisma';
import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { BadRequestException } from '@nestjs/common';

describe('MenuService', () => {
  let menuService: MenuService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const mockPrismaService = {
    menus: {
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    role_menus: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    menu_screens: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
  };

  const mockPaginationService = {
    paginate: jest.fn(),
    createInsensitiveSearch: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PaginationService, useValue: mockPaginationService },
      ],
    }).compile();

    menuService = module.get<MenuService>(MenuService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new menu', async () => {
      const createMenuDto = {
        name: 'Test Menu',
        url: '/test',
        icon: 'test-icon',
        order: 1,
        menuId: null,
      };
      mockPrismaService.menus.create.mockResolvedValue(createMenuDto);

      const result = await menuService.create(createMenuDto);

      expect(result).toEqual(createMenuDto);
      expect(prismaService.menus.create).toHaveBeenCalledWith({
        data: createMenuDto,
      });
    });
  });

  describe('update', () => {
    it('should update a menu', async () => {
      const updateDto = { id: 1, data: { name: 'Updated Menu' } };
      mockPrismaService.menus.update.mockResolvedValue(updateDto.data);

      const result = await menuService.update(updateDto);

      expect(result).toEqual(updateDto.data);
      expect(prismaService.menus.update).toHaveBeenCalledWith({
        where: { id: updateDto.id },
        data: updateDto.data,
      });
    });
  });

  describe('delete', () => {
    it('should delete menus', async () => {
      const deleteDto = { ids: [1, 2, 3] };
      mockPrismaService.menus.deleteMany.mockResolvedValue({ count: 3 });

      const result = await menuService.delete(deleteDto);

      expect(result).toEqual({ count: 3 });
      expect(prismaService.menus.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: deleteDto.ids } },
      });
    });

    it('should throw BadRequestException if no ids are provided', async () => {
      await expect(menuService.delete({ ids: null })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('listScreens', () => {
    it('should paginate screens', async () => {
      const locale = 'en';
      const menuId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      const mockScreens = [{ id: 1, name: 'Screen 1' }];
      mockPaginationService.paginate.mockResolvedValue(mockScreens);

      const result = await menuService.listScreens(
        locale,
        menuId,
        paginationParams,
      );

      expect(result).toEqual(mockScreens);
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.screens,
        paginationParams,
        expect.anything(),
        'screen_translations',
      );
    });
  });

  describe('getMenus', () => {
    it('should get menus for a user', async () => {
      const locale = 'en';
      const userId = 1;
      const mockMenus = [{ id: 1, name: 'Menu 1' }];
      mockPrismaService.menus.findMany.mockResolvedValue(mockMenus);

      const result = await menuService.getMenus(locale, userId);

      expect(result).toEqual(mockMenus);
      expect(prismaService.menus.findMany).toHaveBeenCalled();
    });
  });
});
