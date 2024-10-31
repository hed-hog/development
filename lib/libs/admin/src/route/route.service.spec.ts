import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDTO } from '../dto/delete.dto';
import { UpdateIdsDTO } from '../dto/update-ids.dto';
import { CreateDTO } from './dto/create.dto';
import { UpdateDTO } from './dto/update.dto';
import { RouteService } from './route.service';

describe('RouteService', () => {
  let service: RouteService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const mockPrismaService = {
    route: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    role_route: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    route_screens: {
      deleteMany: jest.fn(),
      createMany: jest.fn(),
    },
    createInsensitiveSearch: jest.fn(),
  };

  const mockPaginationService = {
    paginate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: PaginationService, useValue: mockPaginationService },
      ],
    }).compile();

    service = module.get<RouteService>(RouteService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRoutes', () => {
    it('should paginate route', async () => {
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
      const result = { data: [], total: 0 };

      mockPrismaService.createInsensitiveSearch.mockReturnValue([]);
      mockPaginationService.paginate.mockResolvedValue(result);

      const res = await service.getRoutes(paginationParams);

      expect(mockPrismaService.createInsensitiveSearch).toHaveBeenCalledWith(
        ['url', 'method'],
        paginationParams,
      );
      expect(mockPaginationService.paginate).toHaveBeenCalledWith(
        mockPrismaService.route,
        paginationParams,
        { where: { OR: [] } },
      );
      expect(res).toEqual(result);
    });
  });

  describe('getRouteById', () => {
    it('should return a route by ID', async () => {
      const routeId = 1;
      const route = { id: routeId, url: '/test', method: 'GET' };

      mockPrismaService.route.findUnique.mockResolvedValue(route);

      const res = await service.getRouteById(routeId);

      expect(mockPrismaService.route.findUnique).toHaveBeenCalledWith({
        where: { id: routeId },
      });
      expect(res).toEqual(route);
    });
  });

  describe('create', () => {
    it('should create a new route', async () => {
      const createDto: CreateDTO = { url: '/test', method: 'GET' };
      const route = { id: 1, ...createDto };

      mockPrismaService.route.create.mockResolvedValue(route);

      const res = await service.create(createDto);

      expect(mockPrismaService.route.create).toHaveBeenCalledWith({
        data: createDto,
      });
      expect(res).toEqual(route);
    });
  });

  describe('update', () => {
    it('should update a route', async () => {
      const updateDto: UpdateDTO = { url: '/updated', method: 'POST' };
      const routeId = 1;
      const updatedRoute = { id: routeId, ...updateDto };

      mockPrismaService.route.update.mockResolvedValue(updatedRoute);

      const res = await service.update({ id: routeId, data: updateDto });

      expect(mockPrismaService.route.update).toHaveBeenCalledWith({
        where: { id: routeId },
        data: updateDto,
      });
      expect(res).toEqual(updatedRoute);
    });
  });

  describe('delete', () => {
    it('should delete route by ids', async () => {
      const deleteDto: DeleteDTO = { ids: [1, 2] };
      const result = { count: 2 };

      mockPrismaService.route.deleteMany.mockResolvedValue(result);

      const res = await service.delete(deleteDto);

      expect(mockPrismaService.route.deleteMany).toHaveBeenCalledWith({
        where: { id: { in: deleteDto.ids } },
      });
      expect(res).toEqual(result);
    });
  });

  describe('updateRoles', () => {
    it('should update role for a route', async () => {
      const routeId = 1;
      const updateIdsDto: UpdateIdsDTO = { ids: [1, 2] };
      const result = { count: 2 };

      mockPrismaService.role_route.deleteMany.mockResolvedValue({});
      mockPrismaService.role_route.createMany.mockResolvedValue(result);

      const res = await service.updateRoles(routeId, updateIdsDto);

      expect(mockPrismaService.role_route.deleteMany).toHaveBeenCalledWith({
        where: { route_id: routeId },
      });
      expect(mockPrismaService.role_route.createMany).toHaveBeenCalledWith({
        data: updateIdsDto.ids.map((roleId) => ({
          role_id: roleId,
          route_id: routeId,
        })),
        skipDuplicates: true,
      });
      expect(res).toEqual(result);
    });
  });

  describe('updateScreens', () => {
    it('should update screens for a route', async () => {
      const routeId = 1;
      const updateIdsDto: UpdateIdsDTO = { ids: [1, 2] };
      const result = { count: 2 };

      mockPrismaService.route_screens.deleteMany.mockResolvedValue({});
      mockPrismaService.route_screens.createMany.mockResolvedValue(result);

      const res = await service.updateScreens(routeId, updateIdsDto);

      expect(mockPrismaService.route_screens.deleteMany).toHaveBeenCalledWith({
        where: { route_id: routeId },
      });
      expect(mockPrismaService.route_screens.createMany).toHaveBeenCalledWith({
        data: updateIdsDto.ids.map((screenId) => ({
          screen_id: screenId,
          route_id: routeId,
        })),
        skipDuplicates: true,
      });
      expect(res).toEqual(result);
    });
  });

  describe('listRoles', () => {
    it('should call paginate method with correct parameters', async () => {
      const locale = 'en';
      const routeId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      paginationService.paginate = jest.fn().mockResolvedValue({
        data: [],
        total: 0,
      });

      await service.listRoles(locale, routeId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.role,
        paginationParams,
        {
          include: {
            role_locale: {
              where: {
                locale: { code: locale },
              },
              select: {
                name: true,
                description: true,
              },
            },
            role_route: {
              where: { route_id: routeId },
              select: {
                route_id: true,
                role_id: true,
              },
            },
          },
        },
        'role_locale',
      );
    });
  });

  describe('listScreens', () => {
    it('should call paginate method with correct parameters', async () => {
      const locale = 'en';
      const routeId = 1;
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };

      paginationService.paginate = jest.fn().mockResolvedValue({
        data: [],
        total: 0,
      });

      await service.listScreens(locale, routeId, paginationParams);

      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.screens,
        paginationParams,
        {
          include: {
            screen_locale: {
              where: {
                locale: { code: locale },
              },
              select: {
                name: true,
              },
            },
            route_screens: {
              where: { route_id: routeId },
              select: {
                route_id: true,
                screen_id: true,
              },
            },
          },
        },
        'screen_locale',
      );
    });
  });
});
