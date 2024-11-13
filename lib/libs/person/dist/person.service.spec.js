"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const person_service_1 = require("./person.service");
describe('PersonService', () => {
    let service;
    let prismaService;
    let paginationService;
    const personMock = {
        id: 1,
        name: 'John Doe',
    };
    const paginationMockResult = {
        data: [personMock],
        total: 1,
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                person_service_1.PersonService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person: {
                            create: jest.fn().mockResolvedValue(personMock),
                            findUnique: jest.fn().mockResolvedValue(personMock),
                            update: jest.fn().mockResolvedValue(personMock),
                            deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
                        },
                        createInsensitiveSearch: jest.fn().mockReturnValue([]),
                    },
                },
                {
                    provide: pagination_1.PaginationService,
                    useValue: {
                        paginate: jest.fn().mockResolvedValue(paginationMockResult),
                    },
                },
            ],
        }).compile();
        service = module.get(person_service_1.PersonService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a person', async () => {
        const createPersonDto = {
            name: 'John Doe',
            type_id: 1,
        };
        const result = await service.create(createPersonDto);
        expect(prismaService.person.create).toHaveBeenCalledWith({
            data: createPersonDto,
        });
        expect(result).toEqual(personMock);
    });
    /*
    it('should get person with pagination', async () => {
      const locale = 'en';
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
  
      const result = await service.getPersons(locale, paginationParams);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person,
        paginationParams,
        {
          where: {
            OR: [],
          },
          include: {
            person_type: expect.any(Object),
            person_document: expect.any(Object),
            person_contact: expect.any(Object),
          },
        },
      );
  
      expect(result).toEqual(paginationMockResult);
    });*/
    /*
    it('should get person by ID', async () => {
      const personId = 1;
  
      const result = await service.getPersonById(personId);
  
      expect(prismaService.person.findUnique).toHaveBeenCalledWith({
        where: { id: personId },
        include: expect.any(Object),
      });
  
      expect(result).toEqual(personMock);
    });*/
    /*
    it('should throw NotFoundException if person not found', async () => {
      const personId = 999; // Non-existent ID
  
      (prismaService.person.findUnique as jest.Mock).mockResolvedValue(null);
  
      await expect(service.getPersonById(personId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getPersonById(personId)).rejects.toThrow(
        `Person with ID ${personId} not found`,
      );
    });
  */
    it('should update a person', async () => {
        const personId = 1;
        const updatePersonDto = {
            name: 'Jane Doe',
            type_id: 1,
        };
        const result = await service.update(personId, updatePersonDto);
        expect(prismaService.person.update).toHaveBeenCalledWith({
            where: { id: personId },
            data: updatePersonDto,
        });
        expect(result).toEqual(personMock);
    });
    /*
    it('should remove person', async () => {
      const deleteDto: DeleteDTO = { ids: [1, 2] };
  
      const result = await service.remove(deleteDto);
  
      expect(prismaService.person.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: deleteDto.ids,
          },
        },
      });
      expect(result).toEqual({ count: 1 });
    });*/
    /*
    it('should throw BadRequestException if no IDs provided for removal', async () => {
      const deleteDto: DeleteDTO = { ids: null };
  
      await expect(service.remove(deleteDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.remove(deleteDto)).rejects.toThrow(
        `You must select at least one person to delete.`,
      );
    });*/
});
//# sourceMappingURL=person.service.spec.js.map