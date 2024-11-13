"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const contact_type_service_1 = require("./contact-type.service");
describe('ContactTypeService', () => {
    let service;
    let prismaService;
    let paginationService;
    const contactTypeMock = {
        id: 1,
        name: 'Email',
    };
    const paginationMock = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: pagination_1.PageOrderDirection.Asc,
        fields: '',
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                contact_type_service_1.ContactTypeService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_contact_type: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            deleteMany: jest.fn(),
                        },
                        createInsensitiveSearch: jest.fn(),
                    },
                },
                {
                    provide: pagination_1.PaginationService,
                    useValue: {
                        paginate: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(contact_type_service_1.ContactTypeService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a contact type', async () => {
        const createContactTypeDto = {
            name: 'Email',
        };
        prismaService.person_contact_type.create.mockResolvedValue(contactTypeMock);
        const result = await service.create(createContactTypeDto);
        expect(prismaService.person_contact_type.create).toHaveBeenCalledWith({
            data: createContactTypeDto,
        });
        expect(result).toEqual(contactTypeMock);
    });
    /*
    it('should get contact types with pagination', async () => {
      (paginationService.paginate as jest.Mock).mockResolvedValue([
        contactTypeMock,
      ]);
  
      const result = await service.getContactTypes('en', paginationMock);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_contact_type,
        paginationMock,
        {
          where: {},
          include: {
            person_contact_type_locale: {
              where: {
                locale: { code: 'en' },
              },
              select: { name: true },
            },
          },
        },
        'person_contact_type_locale',
      );
      expect(result).toEqual([contactTypeMock]);
    });
  
    it('should get a contact type by ID', async () => {
      (
        prismaService.person_contact_type.findUnique as jest.Mock
      ).mockResolvedValue(contactTypeMock);
  
      const result = await service.getContactTypeById(1);
  
      expect(prismaService.person_contact_type.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(contactTypeMock);
    });
  
    it('should throw NotFoundException if contact type not found by ID', async () => {
      (
        prismaService.person_contact_type.findUnique as jest.Mock
      ).mockResolvedValue(null);
  
      await expect(service.getContactTypeById(999)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getContactTypeById(999)).rejects.toThrow(
        `ContactType with ID 999 not found`,
      );
    });
  
    it('should update a contact type', async () => {
      const updateContactTypeDto: UpdateContactTypeDTO = {
        name: 'Updated Name',
      };
  
      (prismaService.person_contact_type.update as jest.Mock).mockResolvedValue({
        ...contactTypeMock,
        ...updateContactTypeDto,
      });
  
      const result = await service.update(1, updateContactTypeDto);
  
      expect(prismaService.person_contact_type.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateContactTypeDto,
      });
      expect(result).toEqual({ ...contactTypeMock, ...updateContactTypeDto });
    });
  
    it('should remove contact types', async () => {
      const deleteDto: DeleteDTO = { ids: [1, 2] };
  
      (
        prismaService.person_contact_type.deleteMany as jest.Mock
      ).mockResolvedValue({
        count: 2,
      });
  
      const result = await service.remove(deleteDto);
  
      expect(prismaService.person_contact_type.deleteMany).toHaveBeenCalledWith({
        where: {
          id: { in: deleteDto.ids },
        },
      });
      expect(result).toEqual({ count: 2 });
    });
  
    it('should throw BadRequestException if no ids provided for deletion', async () => {
      const deleteDto: DeleteDTO = { ids: null };
  
      await expect(service.remove(deleteDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.remove(deleteDto)).rejects.toThrow(
        `You must select at least one ContactType to delete.`,
      );
    });*/
});
//# sourceMappingURL=contact-type.service.spec.js.map