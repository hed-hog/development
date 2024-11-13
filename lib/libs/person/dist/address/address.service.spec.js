"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_1 = require("@hedhog/pagination");
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const address_service_1 = require("./address.service");
describe('AddressService', () => {
    let service;
    let prismaService;
    let paginationService;
    const addressMock = [
        {
            id: 1,
            person_id: 1,
            type_id: 1,
            primary: true,
            street: '123 Main St',
            number: '456',
            complement: 'Apt 7',
            district: 'Downtown',
            city: 'Metropolis',
            state: 'NY',
            postal_code: '12345',
            reference: 'Near the park',
            country_id: 1,
        },
    ];
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                address_service_1.AddressService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        person_address: {
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
        service = module.get(address_service_1.AddressService);
        prismaService = module.get(prisma_1.PrismaService);
        paginationService = module.get(pagination_1.PaginationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create an address', async () => {
        const createAddressDto = {
            country_id: 1,
            type_id: 1,
            primary: true,
            street: '123 Main St',
            number: 456,
            complement: 'Apt 7',
            district: 'Downtown',
            city: 'Metropolis',
            state: 'NY',
            postal_code: '12345',
            reference: 'Near the park',
        };
        const personId = 1;
        prismaService.person_address.create.mockResolvedValue(addressMock[0]);
        const result = await service.create(personId, createAddressDto);
        expect(prismaService.person_address.create).toHaveBeenCalledWith({
            data: Object.assign({ person_id: personId, country_id: createAddressDto.country_id }, createAddressDto),
        });
        expect(result).toEqual(addressMock[0]);
    });
    /*
    it('should paginate addresses for a person', async () => {
      const personId = 1;
      const paginationParams = {
        fields:
          'id,type_id,person_id,primary,street,number,complement,district,city,state,postal_code,reference,country_id',
      };
  
      (paginationService.paginate as jest.Mock).mockResolvedValue({
        total: 1,
        page: 1,
        pageSize: 10,
        data: addressMock,
      });
  
      const result = await service.getAddress(personId);
  
      expect(paginationService.paginate).toHaveBeenCalledWith(
        prismaService.person_address,
        paginationParams,
        { where: { person_id: personId } },
      );
      expect(result).toEqual({
        total: 1,
        page: 1,
        pageSize: 10,
        data: addressMock,
      });
    });
  
    it('should get address by type ID', async () => {
      const personId = 1;
      const typeId = 1;
  
      (prismaService.person_address.findFirst as jest.Mock).mockResolvedValue(
        addressMock[0],
      );
  
      const result = await service.getAddressByTypeId(personId, typeId);
  
      expect(prismaService.person_address.findFirst).toHaveBeenCalledWith({
        where: {
          person_id: personId,
          type_id: typeId,
        },
      });
      expect(result).toEqual(addressMock[0]);
    });
  
    it('should throw NotFoundException if address not found by type ID', async () => {
      const personId = 1;
      const typeId = 999; // Non-existent ID
  
      (prismaService.person_address.findFirst as jest.Mock).mockResolvedValue(
        null,
      );
  
      await expect(service.getAddressByTypeId(personId, typeId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getAddressByTypeId(personId, typeId)).rejects.toThrow(
        `Type with ID ${typeId} not found`,
      );
    });
  
    it('should get address by ID', async () => {
      const addressId = 1;
  
      (prismaService.person_address.findFirst as jest.Mock).mockResolvedValue(
        addressMock[0],
      );
  
      const result = await service.getAddressById(addressId);
  
      expect(prismaService.person_address.findFirst).toHaveBeenCalledWith({
        where: { id: addressId },
      });
      expect(result).toEqual(addressMock[0]);
    });
  
    it('should update an address', async () => {
      const addressId = 1;
      const updateAddressDto: UpdatePersonAddressDTO = {
        primary: false,
        street: '456 Elm St',
        type_id: 1,
      };
  
      (prismaService.person_address.update as jest.Mock).mockResolvedValue({
        ...addressMock[0],
        ...updateAddressDto,
      });
  
      const result = await service.update(addressId, updateAddressDto);
  
      expect(prismaService.person_address.update).toHaveBeenCalledWith({
        where: { id: addressId },
        data: updateAddressDto,
      });
      expect(result).toEqual({
        ...addressMock[0],
        ...updateAddressDto,
      });
    });
  
    it('should remove an address', async () => {
      const addressId = 1;
  
      (prismaService.person_address.delete as jest.Mock).mockResolvedValue({
        count: 1,
      });
  
      const result = await service.remove(addressId);
  
      expect(prismaService.person_address.delete).toHaveBeenCalledWith({
        where: { id: addressId },
      });
      expect(result).toEqual({ count: 1 });
    });*/
});
//# sourceMappingURL=address.service.spec.js.map