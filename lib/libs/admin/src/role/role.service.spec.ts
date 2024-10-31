/*
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
            role {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
              deleteMany: jest.fn(),
              findMany: jest.fn(),
            },
            role_user: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_menu: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_screen: {
              deleteMany: jest.fn(),
              createMany: jest.fn(),
            },
            role_route: {
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

      jest.spyOn(prismaService.role, 'create').mockResolvedValue(result);

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

//     jest.spyOn(prismaService.role, 'update').mockResolvedValue(result);

//     expect(await roleService.update({ id: 1, data: dto })).toEqual(result);
//   });
// });
/*
  describe('delete', () => {
    it('should delete role', async () => {
      const dto: DeleteDTO = { ids: [1, 2] };
      jest
        .spyOn(prismaService.role, 'deleteMany')
        .mockResolvedValue({ count: 2 });

      await roleService.delete(dto);
      expect(prismaService.role.deleteMany).toHaveBeenCalledWith({
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
    it('should update user for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_user, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_user, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateUsers(roleId, data);

      expect(prismaService.role_user.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_user.createMany).toHaveBeenCalledWith({
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
        .spyOn(prismaService.role_screen, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_screen, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateScreens(roleId, data);

      expect(prismaService.role_screen.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_screen.createMany).toHaveBeenCalledWith({
        data: data.ids.map((screenId) => ({
          role_id: roleId,
          screen_id: screenId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateRoutes', () => {
    it('should update route for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_route, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_route, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateRoutes(roleId, data);

      expect(prismaService.role_route.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_route.createMany).toHaveBeenCalledWith({
        data: data.ids.map((routeId) => ({
          role_id: roleId,
          route_id: routeId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('updateMenus', () => {
    it('should update menu for a role', async () => {
      const roleId = 1;
      const data: UpdateIdsDTO = { ids: [1, 2] };

      jest
        .spyOn(prismaService.role_menu, 'deleteMany')
        .mockResolvedValue({ count: 2 });
      jest
        .spyOn(prismaService.role_menu, 'createMany')
        .mockResolvedValue({ count: 2 });

      await roleService.updateMenus(roleId, data);

      expect(prismaService.role_menu.deleteMany).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });

      expect(prismaService.role_menu.createMany).toHaveBeenCalledWith({
        data: data.ids.map((menuId) => ({
          role_id: roleId,
          menu_id: menuId,
        })),
        skipDuplicates: true,
      });
    });
  });

  describe('listUsers', () => {
    it('should list user associated with a role', async () => {
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
        prismaService.user,
        paginationParams,
        {
          include: {
            role_user: {
              where: { role_id: roleId },
              select: { user_id: true, role_id: true },
            },
          },
        },
      );
    });
  });

  describe('listMenus', () => {
    it('should list menu associated with a role', async () => {
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
        prismaService.menu,
        paginationParams,
        {
          include: {
            menu_locale: {
              where: { locale: { code: locale } },
              select: { name: true },
            },
            role_menu: {
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
    it('should list route associated with a role', async () => {
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
        prismaService.route,
        paginationParams,
        {
          include: {
            role_route: {
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
            role_screen: {
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

      jest.spyOn(prismaService.role, 'findUnique').mockResolvedValue(result);

      expect(await roleService.get('en', roleId)).toEqual(result);
    });
  });
});
*/
