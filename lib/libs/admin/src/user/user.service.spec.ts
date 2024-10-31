import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { genSalt, hash } from 'bcrypt';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { SALT_ROUNDS } from './constants/user.constants';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { UserService } from './user.service';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('mockSalt'),
  hash: jest.fn().mockResolvedValue('mockHashedPassword'),
}));

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
            role_user: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
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

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listRoles', () => {
    it('should return paginated role for a specific user', async () => {
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      const mockPaginatedRoles = {
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
        .mockResolvedValue(mockPaginatedRoles);

      const result = await service.listRoles(1, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.role,
        paginationParams,
        {
          include: {
            role_user: {
              where: { user_id: 1 },
              select: { user_id: true, role_id: true },
            },
          },
        },
      );
      expect(result).toEqual(mockPaginatedRoles);
    });
  });

  describe('updateRoles', () => {
    it('should update user role', async () => {
      const updateIdsDTO: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_user, 'deleteMany')
        .mockResolvedValue({ count: 1 });
      jest
        .spyOn(prismaService.role_user, 'createMany')
        .mockResolvedValue({ count: 2 });

      await service.updateRoles(1, updateIdsDTO);

      expect(prismaService.role_user.deleteMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(prismaService.role_user.createMany).toHaveBeenCalledWith({
        data: [
          { user_id: 1, role_id: 1 },
          { user_id: 1, role_id: 2 },
        ],
        skipDuplicates: true,
      });
    });
  });

  describe('getUsers', () => {
    it('should return paginated user', async () => {
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      const mockPaginatedUsers = {
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
        .mockResolvedValue(mockPaginatedUsers);

      const result = await service.getUsers(paginationParams);

      expect(prismaService.createInsensitiveSearch).toHaveBeenCalledWith(
        ['name', 'email'],
        paginationParams,
      );
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.user,
        paginationParams,
        { where: { OR: [] } },
      );
      expect(result).toEqual(mockPaginatedUsers);
    });
  });

  describe('get', () => {
    it('should return a specific user by ID', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'user@email.com',
        password: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
        multifactor_id: null,
        code: null,
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await service.get(1);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'plainPassword';
      const result = await service.hashPassword(password);

      expect(genSalt).toHaveBeenCalledWith(SALT_ROUNDS);
      expect(hash).toHaveBeenCalledWith(password, 'mockSalt');
      expect(result).toEqual('mockHashedPassword');
    });
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createDTO: CreateDTO = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
      };
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'user@email.com',
        password: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
        multifactor_id: null,
        code: null,
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await service.create(createDTO);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: createDTO.email,
          name: createDTO.name,
          password: 'mockHashedPassword',
        },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateDTO: UpdateDTO = { name: 'Updated User' };
      const updateInput = { id: 1, data: updateDTO };
      const mockUser = {
        id: 1,
        name: 'Updated User',
        email: 'user@email.com',
        password: 'hashedpassword',
        created_at: new Date(),
        updated_at: new Date(),
        multifactor_id: null,
        code: null,
      };
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const result = await service.update(updateInput);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: updateInput.id },
        data: updateInput.data,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should throw an error if no ids are provided', async () => {
      const deleteDTO: DeleteDTO = { ids: null };

      await expect(service.delete(deleteDTO)).rejects.toThrow(
        new BadRequestException('You must select at least one user to delete.'),
      );
    });

    it('should delete user by ids', async () => {
      const deleteDTO: DeleteDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.user, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await service.delete(deleteDTO);

      expect(prismaService.user.deleteMany).toHaveBeenCalledWith({
        where: {
          id: { in: deleteDTO.ids },
          email: { not: { startsWith: 'root@' } },
        },
      });
    });
  });
});
