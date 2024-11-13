"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const document_type_service_1 = require("./document-type.service");
describe('DocumentTypeService', () => {
    let service;
    let prismaService;
    let paginationService;
    const documentTypeMock = {
        id: 1,
        name: 'Passport',
    };
    const paginationMockResult = [documentTypeMock];
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                document_type_service_1.DocumentTypeService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_document_type: {
                            create: jest.fn().mockResolvedValue(documentTypeMock),
                            findUnique: jest.fn().mockResolvedValue(documentTypeMock),
                            update: jest.fn().mockResolvedValue(documentTypeMock),
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
        service = module.get(document_type_service_1.DocumentTypeService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a document type', async () => {
        const createDocumentTypeDto = {
            name: 'Passport',
        };
        const result = await service.create(createDocumentTypeDto);
        expect(prismaService.person_document_type.create).toHaveBeenCalledWith({
            data: createDocumentTypeDto,
        });
        expect(result).toEqual(documentTypeMock);
    });
    /*
    it('should get document types with pagination', async () => {
      const locale = 'en';
      const paginationParams: PaginationDTO = {
        page: 1,
        pageSize: 10,
        search: '',
        sortField: '',
        sortOrder: PageOrderDirection.Asc,
        fields: '',
      };
  
      const result = await service.getDocumentTypes(locale, paginationParams);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_document_type,
        paginationParams,
        {
          where: {
            OR: [],
          },
          include: {
            person_document_type_locale: {
              where: {
                locale: {
                  code: locale,
                },
              },
              select: {
                name: true,
              },
            },
          },
        },
        'person_document_type_locale',
      );
      expect(result).toEqual(paginationMockResult);
    });
  
    it('should get document type by ID', async () => {
      const documentTypeId = 1;
  
      const result = await service.getDocumentTypeById(documentTypeId);
  
      expect(prismaService.person_document_type.findUnique).toHaveBeenCalledWith({
        where: { id: documentTypeId },
      });
      expect(result).toEqual(documentTypeMock);
    });
  
    it('should throw NotFoundException if document type not found', async () => {
      const documentTypeId = 999; // Non-existent ID
  
      (
        prismaService.person_document_type.findUnique as jest.Mock
      ).mockResolvedValue(null);
  
      await expect(service.getDocumentTypeById(documentTypeId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getDocumentTypeById(documentTypeId)).rejects.toThrow(
        `DocumentType with ID ${documentTypeId} not found`,
      );
    });
  
    it('should update a document type', async () => {
      const documentTypeId = 1;
      const updateDocumentTypeDto: UpdateDocumentTypeDTO = {
        name: 'Updated Passport',
      };
  
      const result = await service.update(documentTypeId, updateDocumentTypeDto);
  
      expect(prismaService.person_document_type.update).toHaveBeenCalledWith({
        where: { id: documentTypeId },
        data: updateDocumentTypeDto,
      });
      expect(result).toEqual(documentTypeMock);
    });
  
    it('should remove document types', async () => {
      const deleteDto: DeleteDTO = { ids: [1, 2] };
  
      const result = await service.remove(deleteDto);
  
      expect(prismaService.person_document_type.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: deleteDto.ids,
          },
        },
      });
      expect(result).toEqual({ count: 1 });
    });
  
    it('should throw BadRequestException if no IDs provided for removal', async () => {
      const deleteDto: DeleteDTO = { ids: null };
  
      await expect(service.remove(deleteDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.remove(deleteDto)).rejects.toThrow(
        `You must select at least one DocumentType to delete.`,
      );
    });*/
});
//# sourceMappingURL=document-type.service.spec.js.map