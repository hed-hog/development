"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const contact_service_1 = require("./contact.service");
describe('ContactService', () => {
    let service;
    let prismaService;
    let paginationService;
    const contactMock = {
        id: 1,
        person_id: 1,
        type_id: 2,
        primary: true,
        value: 'example@example.com',
        person_contact_type: {
            id: 2,
            name: 'Email',
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                contact_service_1.ContactService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_contact: {
                            create: jest.fn(),
                            findFirst: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
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
        service = module.get(contact_service_1.ContactService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a contact', async () => {
        const createContactDto = {
            type_id: 2,
            primary: true,
            value: 'example@example.com',
        };
        prismaService.person_contact.create.mockResolvedValue(contactMock);
        const result = await service.create(1, createContactDto);
        expect(prismaService.person_contact.create).toHaveBeenCalledWith({
            data: Object.assign({ person_id: 1 }, createContactDto),
        });
        expect(result).toEqual(contactMock);
    });
    /*
    it('should get contacts for a person', async () => {
      (paginationService.paginate as jest.Mock).mockResolvedValue([contactMock]);
  
      const result = await service.getContacts(1);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_contact,
        { fields: 'id,person_id,type_id,primary,value' },
        {
          where: { person_id: 1 },
          include: {
            person_contact_type: { select: { id: true, name: true } },
          },
        },
      );
      expect(result).toEqual([contactMock]);
    });
  
    it('should get a contact by type ID', async () => {
      const typeId = 2;
  
      (prismaService.person_contact.findFirst as jest.Mock).mockResolvedValue(
        contactMock,
      );
  
      const result = await service.getContactByTypeId(1, typeId);
  
      expect(prismaService.person_contact.findFirst).toHaveBeenCalledWith({
        where: { person_id: 1, type_id: typeId },
        include: {
          person_contact_type: { select: { id: true, name: true } },
        },
      });
      expect(result).toEqual(contactMock);
    });
  
    it('should throw NotFoundException if contact not found by type ID', async () => {
      (prismaService.person_contact.findFirst as jest.Mock).mockResolvedValue(
        null,
      );
  
      await expect(service.getContactByTypeId(1, 999)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getContactByTypeId(1, 999)).rejects.toThrow(
        `Type with ID 999 not found`,
      );
    });
  
    it('should get a contact by ID', async () => {
      (prismaService.person_contact.findFirst as jest.Mock).mockResolvedValue(
        contactMock,
      );
  
      const result = await service.getContactById(1);
  
      expect(prismaService.person_contact.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          person_contact_type: { select: { id: true, name: true } },
        },
      });
      expect(result).toEqual(contactMock);
    });
  
    it('should update a contact', async () => {
      const updateContactDto: UpdatePersonContactDTO = {
        type_id: 2,
        primary: true,
        value: 'new@example.com',
      };
  
      (prismaService.person_contact.update as jest.Mock).mockResolvedValue({
        ...contactMock,
        ...updateContactDto,
      });
  
      const result = await service.update(1, updateContactDto);
  
      expect(prismaService.person_contact.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateContactDto,
      });
      expect(result).toEqual({ ...contactMock, ...updateContactDto });
    });
  
    it('should remove a contact', async () => {
      (prismaService.person_contact.delete as jest.Mock).mockResolvedValue(
        contactMock,
      );
  
      const result = await service.remove(1);
  
      expect(prismaService.person_contact.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ count: 1 });
    });*/
});
//# sourceMappingURL=contact.service.spec.js.map