"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const address_type_service_1 = require("./address-type.service");
describe('AddressTypeService', () => {
    let service;
    let prismaService;
    // let paginationService: PaginationService;
    const addressTypeMock = {
        id: 1,
        name: 'Residential',
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                address_type_service_1.AddressTypeService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_address_type: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            deleteMany: jest.fn(),
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
        service = module.get(address_type_service_1.AddressTypeService);
        prismaService = module.get(prisma_1.PrismaService);
        // paginationService = module.get<PaginationService>(PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create an address type', async () => {
        const createAddressTypeDto = {
            name: 'Residential',
        };
        prismaService.person_address_type.create.mockResolvedValue(addressTypeMock);
        const result = await service.create(createAddressTypeDto);
        expect(prismaService.person_address_type.create).toHaveBeenCalledWith({
            data: createAddressTypeDto,
        });
        expect(result).toEqual(addressTypeMock);
    });
    /*
    it('should get an address type by ID', async () => {
      const addressTypeId = 1;
  
      (
        prismaService.person_address_type.findUnique as jest.Mock
      ).mockResolvedValue(addressTypeMock);
  
      const result = await service.getAddressTypeById(addressTypeId);
  
      expect(prismaService.person_address_type.findUnique).toHaveBeenCalledWith({
        where: { id: addressTypeId },
      });
      expect(result).toEqual(addressTypeMock);
    });
  
    it('should throw NotFoundException if address type not found', async () => {
      const addressTypeId = 999;
  
      (
        prismaService.person_address_type.findUnique as jest.Mock
      ).mockResolvedValue(null);
  
      await expect(service.getAddressTypeById(addressTypeId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getAddressTypeById(addressTypeId)).rejects.toThrow(
        `addressType with ID ${addressTypeId} not found`,
      );
    });
  
    it('should update an address type', async () => {
      const addressTypeId = 1;
      const updateAddressTypeDto: UpdateAddressTypeDTO = {
        name: 'Commercial',
      };
  
      (prismaService.person_address_type.update as jest.Mock).mockResolvedValue({
        ...addressTypeMock,
        ...updateAddressTypeDto,
      });
  
      const result = await service.update(addressTypeId, updateAddressTypeDto);
  
      expect(prismaService.person_address_type.update).toHaveBeenCalledWith({
        where: { id: addressTypeId },
        data: updateAddressTypeDto,
      });
      expect(result).toEqual({ ...addressTypeMock, ...updateAddressTypeDto });
    });
  
    it('should remove address types', async () => {
      const deleteDto: DeleteDTO = { ids: [1, 2] };
  
      (
        prismaService.person_address_type.deleteMany as jest.Mock
      ).mockResolvedValue({
        count: 2,
      });
  
      const result = await service.remove(deleteDto);
  
      expect(prismaService.person_address_type.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: deleteDto.ids,
          },
        },
      });
      expect(result).toEqual({ count: 2 });
    });
  
    it('should throw BadRequestException if no IDs provided for removal', async () => {
      const deleteDto: DeleteDTO = { ids: null };
  
      await expect(service.remove(deleteDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.remove(deleteDto)).rejects.toThrow(
        `You must select at least one addressType to delete.`,
      );
    });*/
});
//# sourceMappingURL=address-type.service.spec.js.map