// import {
//   PageOrderDirection,
//   PaginationDTO,
//   PaginationService,
// } from '@hedhog/pagination';
// import { PrismaService } from '@hedhog/prisma';
// import { BadRequestException } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { DeleteDTO } from '../dto/delete.dto';
// import { UpdateIdsDTO } from '../dto/update-ids.dto';
// import { ScreenService } from './screen.service';

// describe('ScreenService', () => {
//   let service: ScreenService;
//   let prismaService: PrismaService;
//   let paginationService: PaginationService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ScreenService,
//         {
//           provide: PrismaService,
//           useValue: {
//             screens: {
//               create: jest.fn(),
//               update: jest.fn(),
//               deleteMany: jest.fn(),
//               findUnique: jest.fn(),
//             },
//             route: {
//               findMany: jest.fn(),
//             },
//             role_screen: {
//               deleteMany: jest.fn(),
//               createMany: jest.fn(),
//             },
//             route_screens: {
//               deleteMany: jest.fn(),
//               createMany: jest.fn(),
//             },
//             createInsensitiveSearch: jest.fn(),
//           },
//         },
//         {
//           provide: PaginationService,
//           useValue: {
//             paginate: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<ScreenService>(ScreenService);
//     prismaService = module.get<PrismaService>(PrismaService);
//     paginationService = module.get<PaginationService>(PaginationService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a screen', async () => {
//       const createDTO = {
//         name: 'Test Screen',
//         slug: 'test-screen',
//         description: 'This is a test screen',
//         icon: 'test-icon',
//       };

//       jest
//         .spyOn(prismaService.screens, 'create')
//         .mockResolvedValue(createDTO as any);

//       const result = await service.create(createDTO);

//       expect(prismaService.screens.create).toHaveBeenCalledWith({
//         data: createDTO,
//       });
//       expect(result).toEqual(createDTO);
//     });
//   });

//   describe('delete', () => {
//     it('should throw an error if no ids are provided', async () => {
//       const deleteDTO: DeleteDTO = { ids: null };

//       await expect(service.delete(deleteDTO)).rejects.toThrow(
//         new BadRequestException(
//           `You must select at least one screen to delete.`,
//         ),
//       );
//     });

//     it('should delete screens by ids', async () => {
//       const deleteDTO: DeleteDTO = { ids: [1, 2] };

//       jest.spyOn(prismaService.screens, 'deleteMany').mockResolvedValue({
//         count: 2,
//       });

//       await service.delete(deleteDTO);

//       expect(prismaService.screens.deleteMany).toHaveBeenCalledWith({
//         where: { id: { in: deleteDTO.ids } },
//       });
//     });
//   });

//   describe('update', () => {
//     it('should update a screen', async () => {
//       const updateDTO = {
//         id: 1,
//         name: 'Updated Screen',
//         slug: 'updated-screen',
//         icon: 'update-icon',
//         created_at: new Date(),
//         updated_at: new Date(),
//       };
//       const updateInput = { id: 1, data: updateDTO };

//       jest.spyOn(prismaService.screens, 'update').mockResolvedValue(updateDTO);

//       const result = await service.update(updateInput);

//       expect(prismaService.screens.update).toHaveBeenCalledWith({
//         where: { id: updateInput.id },
//         data: updateInput.data,
//       });
//       expect(result).toEqual(updateDTO);
//     });
//   });

//   describe('get', () => {
//     it('should get a screen by id', async () => {
//       const screen = {
//         id: 1,
//         name: 'Updated Screen',
//         slug: 'updated-screen',
//         icon: 'update-icon',
//         created_at: new Date(),
//         updated_at: new Date(),
//       };

//       jest.spyOn(prismaService.screens, 'findUnique').mockResolvedValue(screen);

//       const result = await service.get(1);

//       expect(prismaService.screens.findUnique).toHaveBeenCalledWith({
//         where: { id: 1 },
//       });
//       expect(result).toEqual(screen);
//     });
//   });

//   describe('updateRoles', () => {
//     it('should update role for a screen', async () => {
//       const screenId = 1;
//       const updateIdsDTO: UpdateIdsDTO = { ids: [1, 2, 3] };
//       jest.spyOn(prismaService.role_screen, 'deleteMany').mockResolvedValue({
//         count: 1,
//       });

//       jest.spyOn(prismaService.role_screen, 'createMany').mockResolvedValue({
//         count: updateIdsDTO.ids.length,
//       });

//       await service.updateRoles(screenId, updateIdsDTO);

//       expect(prismaService.role_screen.deleteMany).toHaveBeenCalledWith({
//         where: { screen_id: screenId },
//       });
//       expect(prismaService.role_screen.createMany).toHaveBeenCalledWith({
//         data: updateIdsDTO.ids.map((roleId) => ({
//           screen_id: screenId,
//           role_id: roleId,
//         })),
//         skipDuplicates: true,
//       });
//     });
//   });

//   describe('updateRoutes', () => {
//     it('should delete existing route_screens and create new ones', async () => {
//       const screenId = 1;
//       const updateIdsDTO: UpdateIdsDTO = { ids: [1, 2, 3] };

//       prismaService.route.findMany = jest
//         .fn()
//         .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);

//       prismaService.route_screens.deleteMany = jest.fn();
//       prismaService.route_screens.createMany = jest.fn();

//       await service.updateRoutes(screenId, updateIdsDTO);

//       expect(prismaService.route.findMany).toHaveBeenCalledWith({
//         where: { id: { in: updateIdsDTO.ids } },
//         select: { id: true },
//       });

//       expect(prismaService.route_screens.deleteMany).toHaveBeenCalledWith({
//         where: { screen_id: screenId },
//       });

//       expect(prismaService.route_screens.createMany).toHaveBeenCalledWith({
//         data: updateIdsDTO.ids.map((routeId) => ({
//           screen_id: screenId,
//           route_id: routeId,
//         })),
//         skipDuplicates: true,
//       });
//     });
//   });

//   describe('listRoles', () => {
//     it('should call paginate method with correct parameters', async () => {
//       const locale = 'en';
//       const screenId = 1;
//       const paginationParams: PaginationDTO = {
//         page: 1,
//         pageSize: 10,
//         search: '',
//         sortField: '',
//         sortOrder: PageOrderDirection.Asc,
//         fields: '',
//       };

//       paginationService.paginate = jest.fn().mockResolvedValue({
//         data: [],
//         total: 0,
//       });

//       await service.listRoles(locale, screenId, paginationParams);

//       expect(paginationService.paginate).toHaveBeenCalledWith(
//         prismaService.role,
//         paginationParams,
//         {
//           include: {
//             role_screen: {
//               where: {
//                 screen_id: screenId,
//               },
//               select: {
//                 role_id: true,
//                 screen_id: true,
//               },
//             },
//           },
//         },
//       );
//     });
//   });

//   describe('listRoutes', () => {
//     it('should paginate the route linked to a screen', async () => {
//       const paginationParams: PaginationDTO = {
//         page: 1,
//         pageSize: 10,
//         search: '',
//         sortField: '',
//         sortOrder: PageOrderDirection.Asc,
//         fields: '',
//       };
//       const screenId = 1;
//       const mockPaginationResult = {
//         data: [],
//         total: 10,
//         lastPage: 1,
//         page: 1,
//         prev: 0,
//         next: 2,
//         pageSize: 10,
//       };

//       jest
//         .spyOn(paginationService, 'paginate')
//         .mockResolvedValue(mockPaginationResult);

//       await service.listRoutes(screenId, paginationParams);

//       expect(paginationService.paginate).toHaveBeenCalledWith(
//         prismaService.route,
//         paginationParams,
//         {
//           include: {
//             route_screens: {
//               where: { screen_id: screenId },
//               select: { route_id: true, screen_id: true },
//             },
//           },
//         },
//       );
//     });
//   });
// });
