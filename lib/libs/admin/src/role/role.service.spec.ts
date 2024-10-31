import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: PrismaService,
          useValue: {
            roles: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
            role_users: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_menus: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_screens: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_routes: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
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

    roleService = module.get<RoleService>(RoleService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });
  /*
  describe('create', () => {
    it('should create a new role', async () => {
      const dto: CreateDTO = {
        name: 'Admin',
        description: 'Administrator role',
      };
      const result = {
        id: 1,
        ...dto,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.roles, 'create').mockResolvedValue(result);

      expect(await roleService.create(dto)).toEqual(result);
    });
  });
*/
  // describe('update', () => {
  //   it('should update an existing role', async () => {
  //     const dto: UpdateDTO = {
  //       name: 'Admin',
  //       description: 'Updated description',
  //     };
  //     const result = {
  //       id: 1,
  //       ...dto,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     };

  //     jest.spyOn(prismaService.roles, 'update').mockResolvedValue(result);

  //     expect(await roleService.update({ id: 1, data: dto })).toEqual(result);
  //   });
  // });

  describe('delete', () => {
    it('should delete roles', async () => {
      const dto: DeleteDTO = { ids: [1, 2] };
      jest
        .spyOn(prismaService.roles, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await roleService.delete(dto);
      expect(prismaService.roles.deleteMany).toHaveBeenCalledWith({
        where: {
          id: { in: dto.ids },
        },
      });
    });

    it('should throw BadRequestException if no ids are provided', async () => {
      const dto: DeleteDTO = { ids: null };
      await expect(roleService.delete(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateUsers', () => {
    it('should update users for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_users, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_users, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateUsers(roleId, data);

      expect(prismaService.role_users.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_users.createMany).toHaveBeenCalledWith({
        data: data.ids.map((userId) => ({
          role_id: roleId,
          user_id: userId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateScreens', () => {
    it('should update screens for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_screens, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_screens, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateScreens(roleId, data);

      expect(prismaService.role_screens.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_screens.createMany).toHaveBeenCalledWith({
        data: data.ids.map((screenId) => ({
          role_id: roleId,
          screen_id: screenId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateRoutes', () => {
    it('should update routes for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_routes, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_routes, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateRoutes(roleId, data);

      expect(prismaService.role_routes.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_routes.createMany).toHaveBeenCalledWith({
        data: data.ids.map((routeId) => ({
          role_id: roleId,
          route_id: routeId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateMenus', () => {
    it('should update menus for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_menus, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_menus, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateMenus(roleId, data);

      expect(prismaService.role_menus.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_menus.createMany).toHaveBeenCalledWith({
        data: data.ids.map((menuId) => ({
          role_id: roleId,
          menu_id: menuId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('listUsers', () => {
    it('should list users associated with a role', async () => {
      const roleId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
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

      await roleService.listUsers(roleId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.users,
        paginationParams,
        {
          include: {
            role_users: {
              where: { role_id: roleId },
              select: { user_id: true, role_id: true },
            },
          },
        },
      );
    });
  });

  describe('listMenus', () => {
    it('should list menus associated with a role', async () => {
      const locale = 'en';
      const roleId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
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

      await roleService.listMenus(locale, roleId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.menus,
        paginationParams,
        {
          include: {
            menu_locale: {
              where: { locale: { code: locale } },
              select: { name: true },
            },
            role_menus: {
              where: { role_id: roleId },
              select: { menu_id: true, role_id: true },
            },
          },
        },
        'menu_locale',
      );
    });
  });

  describe('listRoutes', () => {
    it('should list routes associated with a role', async () => {
      const roleId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
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

      await roleService.listRoutes(roleId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.routes,
        paginationParams,
        {
          include: {
            role_routes: {
              where: { role_id: roleId },
              select: { route_id: true, role_id: true },
            },
          },
        },
      );
    });
  });

  describe('listScreens', () => {
    it('should list screens associated with a role', async () => {
      const locale = 'en';
      const roleId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
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

      await roleService.listScreens(locale, roleId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.screens,
        paginationParams,
        {
          include: {
            screen_locale: {
              where: { locale: { code: locale } },
              select: { name: true },
            },
            role_screens: {
              where: { role_id: roleId },
              select: { screen_id: true, role_id: true },
            },
          },
        },
        'screen_locale',
      );
    });
  });

  describe('get', () => {
    it('should get a specific role by ID', async () => {
      const roleId = 1;
      const result = { id: roleId, name: 'Admin', description: 'Admin role' };

      jest.spyOn(prismaService.roles, 'findUnique').mockResolvedValue(result);

      expect(await roleService.get('en', roleId)).toEqual(result);
    });
  });
});
