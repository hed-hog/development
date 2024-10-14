import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { PrismaService } from '@hedhog/prisma';
import { PaginationService } from '@hedhog/pagination';
import { BadRequestException } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';

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

  describe('update', () => {
    it('should update an existing role', async () => {
      const dto: UpdateDTO = {
        name: 'Admin',
        description: 'Updated description',
      };
      const result = {
        id: 1,
        ...dto,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.roles, 'update').mockResolvedValue(result);

      expect(await roleService.update({ id: 1, data: dto })).toEqual(result);
    });
  });

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

  // Additional tests for updateScreens, updateRoutes, updateMenus, listUsers, listMenus, etc. can be added similarly.
});
