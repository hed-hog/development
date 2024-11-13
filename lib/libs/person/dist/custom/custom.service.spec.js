"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const custom_service_1 = require("./custom.service");
describe('CustomService', () => {
    let service;
    let prismaService;
    let paginationService;
    const customMock = {
        id: 1,
        person_id: 1,
        type_id: 1,
        name: 'Custom Name',
        value: 'Custom Value',
    };
    const personCustomsMock = {
        create: jest.fn().mockResolvedValue(customMock),
        findFirst: jest.fn().mockResolvedValue(customMock),
        update: jest.fn().mockResolvedValue(customMock),
        delete: jest.fn().mockResolvedValue(customMock),
    };
    const paginationMock = {
        paginate: jest.fn().mockResolvedValue([customMock]),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                custom_service_1.CustomService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_custom: personCustomsMock,
                    },
                },
                {
                    provide: pagination_1.PaginationService,
                    useValue: paginationMock,
                },
            ],
        }).compile();
        service = module.get(custom_service_1.CustomService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a custom entry', async () => {
        const createCustomDto = {
            type_id: 1,
            name: 'Custom Name',
            value: 'Custom Value',
        };
        const result = await service.create(1, createCustomDto);
        expect(prismaService.person_custom.create).toHaveBeenCalledWith({
            data: Object.assign({ person_id: 1 }, createCustomDto),
        });
        expect(result).toEqual(customMock);
    });
    /*
    it('should get customs by person ID', async () => {
      const personId = 1;
  
      const result = await service.getCustoms(personId);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_custom,
        {
          fields: 'id,person_id,type_id,name,value',
        },
        {
          where: {
            person_id: personId,
          },
          include: {
            person_custom_type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      );
      expect(result).toEqual([customMock]);
    });
  
    it('should get custom by person ID and custom ID', async () => {
      const personId = 1;
      const customId = 1;
  
      const result = await service.getCustomByTypeId(personId, customId);
  
      expect(prismaService.person_custom.findFirst).toHaveBeenCalledWith({
        where: {
          person_id: personId,
          id: customId,
        },
        include: {
          person_custom_type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      expect(result).toEqual(customMock);
    });
  
    it('should throw NotFoundException if custom not found', async () => {
      const personId = 1;
      const customId = 999; // Non-existent ID
  
      (prismaService.person_custom.findFirst as jest.Mock).mockResolvedValue(
        null,
      );
  
      await expect(service.getCustomByTypeId(personId, customId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getCustomByTypeId(personId, customId)).rejects.toThrow(
        `ID not found`,
      );
    });
  
    it('should update a custom entry', async () => {
      const customId = 1;
      const updateCustomDto: UpdatePersonCustomDTO = {
        type_id: 2,
        name: 'Updated Name',
        value: 'Updated Value',
      };
  
      const result = await service.update(customId, updateCustomDto);
  
      expect(prismaService.person_custom.update).toHaveBeenCalledWith({
        where: { id: customId },
        data: updateCustomDto,
      });
      expect(result).toEqual(customMock);
    });
  
    it('should remove a custom entry', async () => {
      const customId = 1;
  
      const result = await service.remove(customId);
  
      expect(prismaService.person_custom.delete).toHaveBeenCalledWith({
        where: {
          id: customId,
        },
      });
      expect(result).toEqual({ count: 1 });
    });*/
});
//# sourceMappingURL=custom.service.spec.js.map