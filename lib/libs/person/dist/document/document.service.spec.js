"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const document_service_1 = require("./document.service");
describe('DocumentService', () => {
    let service;
    let prismaService;
    let paginationService;
    const documentMock = {
        id: 1,
        person_id: 123,
        type_id: 1,
        primary: true,
        value: 'Document Value',
        country_id: 1,
        issued_at: new Date(),
        expiry_at: new Date(),
        person_document_type: {
            id: 1,
            name: 'Type Name',
        },
        countries: {
            name: 'Country Name',
        },
    };
    const paginationMockResult = [documentMock];
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                document_service_1.DocumentService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_document: {
                            create: jest.fn().mockResolvedValue(documentMock),
                            findFirst: jest.fn().mockResolvedValue(documentMock),
                            update: jest.fn().mockResolvedValue(documentMock),
                            delete: jest.fn().mockResolvedValue({ count: 1 }),
                        },
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
        service = module.get(document_service_1.DocumentService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a document', async () => {
        const createDocumentDto = {
            type_id: 1,
            primary: true,
            value: 'Document Value',
            country_id: 1,
            issued_at: new Date(),
            expiry_at: new Date(),
        };
        const personId = 123;
        const result = await service.create(personId, createDocumentDto);
        expect(prismaService.person_document.create).toHaveBeenCalledWith({
            data: Object.assign({ person_id: personId }, createDocumentDto),
        });
        expect(result).toEqual(documentMock);
    });
    /*
    it('should get documents for a person', async () => {
      const personId = 123;
  
      const result = await service.getDocuments(personId);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_document,
        {
          fields:
            'id,person_id,type_id,primary,value,country_id,issued_at,expiry_at',
        },
        {
          where: {
            person_id: personId,
          },
          include: {
            person_document_type: {
              select: {
                id: true,
                name: true,
              },
            },
            countries: {
              select: {
                name: true,
              },
            },
          },
        },
      );
      expect(result).toEqual(paginationMockResult);
    });
  
    it('should get document by type ID', async () => {
      const personId = 123;
      const typeId = 1;
  
      const result = await service.getDocumentByTypeId(personId, typeId);
  
      expect(prismaService.person_document.findFirst).toHaveBeenCalledWith({
        where: {
          person_id: personId,
          type_id: typeId,
        },
        include: {
          person_document_type: {
            select: {
              id: true,
              name: true,
            },
          },
          countries: {
            select: {
              name: true,
            },
          },
        },
      });
      expect(result).toEqual(documentMock);
    });
  
    it('should throw NotFoundException if document by type ID not found', async () => {
      const personId = 123;
      const typeId = 999;
  
      (prismaService.person_document.findFirst as jest.Mock).mockResolvedValue(
        null,
      );
  
      await expect(service.getDocumentByTypeId(personId, typeId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getDocumentByTypeId(personId, typeId)).rejects.toThrow(
        `Type with ID ${typeId} not found`,
      );
    });
  
    it('should get document by ID', async () => {
      const documentId = 1;
  
      const result = await service.getDocumentById(documentId);
  
      expect(prismaService.person_document.findFirst).toHaveBeenCalledWith({
        where: {
          id: documentId,
        },
        include: {
          person_document_type: {
            select: {
              id: true,
              name: true,
            },
          },
          countries: {
            select: {
              name: true,
            },
          },
        },
      });
      expect(result).toEqual(documentMock);
    });
  
    it('should update a document', async () => {
      const documentId = 1;
      const updateDocumentDto: UpdatePersonDocumentDTO = {
        type_id: 2,
        primary: false,
        value: 'Updated Document Value',
        country_id: 2,
        issued_at: new Date(),
        expiry_at: new Date(),
      };
  
      const result = await service.update(documentId, updateDocumentDto);
  
      expect(prismaService.person_document.update).toHaveBeenCalledWith({
        where: { id: documentId },
        data: updateDocumentDto,
      });
      expect(result).toEqual(documentMock);
    });
  
    it('should remove a document', async () => {
      const documentId = 1;
  
      const result = await service.remove(documentId);
  
      expect(prismaService.person_document.delete).toHaveBeenCalledWith({
        where: {
          id: documentId,
        },
      });
      expect(result).toEqual({ count: 1 });
    });*/
});
//# sourceMappingURL=document.service.spec.js.map