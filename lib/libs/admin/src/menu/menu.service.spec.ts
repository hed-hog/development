import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let menuService: MenuService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const mockPrismaService = {
    menu: {
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    role_menu: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    menu_screen: {
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
        menu_id: undefined,
      };
      mockPrismaService.menu.create.mockResolvedValue(createMenuDto);

      const result = await menuService.create(createMenuDto);

      expect(result).toEqual(createMenuDto);
      expect(prismaService.menu.create).toHaveBeenCalledWith({
        data: createMenuDto,
      });
    });
  });

  describe('update', () => {
    it('should update a menu', async () => {
      const updateDto = { id: 1, data: { name: 'Updated Menu' } };
      mockPrismaService.menu.update.mockResolvedValue(updateDto.data);

      const result = await menuService.update(updateDto);

      expect(result).toEqual(updateDto.data);
      expect(prismaService.menu.update).toHaveBeenCalledWith({
        where: { id: updateDto.id },
        data: updateDto.data,
      });
    });
  });

  describe('delete', () => {
    it('should delete menu', async () => {
      const deleteDto = { ids: [1, 2, 3] };
      mockPrismaService.menu.deleteMany.mockResolvedValue({ count: 3 });

      const result = await menuService.delete(deleteDto);

      expect(result).toEqual({ count: 3 });
      expect(prismaService.menu.deleteMany).toHaveBeenCalledWith({
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
        'screen_locale',
      );
    });
  });

  describe('updateScreens', () => {
    it('should update screens associated with a menu', async () => {
      const menuId = 1;
      const updateData = { ids: [1, 2, 3] };

      jest
        .spyOn(prismaService.menu_screen, 'deleteMany')
        .mockResolvedValue(null);
      jest
        .spyOn(prismaService.menu_screen, 'createMany')
        .mockResolvedValue(null);

      await menuService.updateScreens(menuId, updateData);

      expect(prismaService.menu_screen.deleteMany).toHaveBeenCalledWith({
        where: { menu_id: menuId },
      });

      expect(prismaService.menu_screen.createMany).toHaveBeenCalledWith({
        data: updateData.ids.map((screenId) => ({
          menu_id: menuId,
          screen_id: screenId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateRoles', () => {
    it('should update role associated with a menu', async () => {
      const menuId = 1;
      const updateData = { ids: [1, 2] };

      jest.spyOn(prismaService.role_menu, 'deleteMany').mockResolvedValue(null);
      jest.spyOn(prismaService.role_menu, 'createMany').mockResolvedValue(null);

      await menuService.updateRoles(menuId, updateData);

      expect(prismaService.role_menu.deleteMany).toHaveBeenCalledWith({
        where: { menu_id: menuId },
      });

      expect(prismaService.role_menu.createMany).toHaveBeenCalledWith({
        data: updateData.ids.map((roleId) => ({
          menu_id: menuId,
          role_id: roleId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateOrder', () => {
    it('should update the order of menu', async () => {
      const orderData = { ids: [1, 2, 3] };

      jest.spyOn(prismaService.menu, 'count').mockResolvedValue(3);
      jest.spyOn(prismaService.menu, 'update').mockResolvedValue(null);

      await menuService.updateOrder(orderData);

      expect(prismaService.menu.count).toHaveBeenCalledWith({
        where: { id: { in: orderData.ids } },
      });

      expect(prismaService.menu.update).toHaveBeenCalledTimes(
        orderData.ids.length,
      );

      orderData.ids.forEach((id, index) => {
        expect(prismaService.menu.update).toHaveBeenCalledWith({
          where: { id },
          data: { order: index + 1 },
        });
      });
    });

    it('should throw BadRequestException if IDs are invalid', async () => {
      const orderData = { ids: [1, 2, 3] };

      jest.spyOn(prismaService.menu, 'count').mockResolvedValue(2); // IDs não batem com o número esperado

      await expect(menuService.updateOrder(orderData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  /*
  describe('getMenus', () => {
    it('should get menu for a user', async () => {
      const locale = 'en';
      const userId = 1;
      const mockMenus = [{ id: 1, name: 'Menu 1' }];
      mockPrismaService.menu.findMany.mockResolvedValue(mockMenus);

      const result = await menuService.getMenus(locale, userId);

      expect(result).toEqual(mockMenus);
      expect(prismaService.menu.findMany).toHaveBeenCalled();
    });
  });
  */
});
