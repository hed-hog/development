import { Test, TestingModule } from '@nestjs/testing';
import { AddressTypeService } from './address-type.service';
import { PrismaService } from '@hedhog/prisma';
import { PaginationService } from '@hedhog/pagination';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAddressTypeDTO } from './dto/create-address-type.dto';
import { UpdateAddressTypeDTO } from './dto/update-address-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

interface PersonAddressTypesMock {
  create: jest.Mock;
  findUnique: jest.Mock;
  update: jest.Mock;
  deleteMany: jest.Mock;
}

describe('AddressTypeService', () => {
  let service: AddressTypeService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const addressTypeMock = {
    id: 1,
    name: 'Residential',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressTypeService,
        {
          provide: PrismaService,
          useValue: {
            person_address_types: {
              create: jest.fn() as PersonAddressTypesMock['create'],
              findUnique: jest.fn() as PersonAddressTypesMock['findUnique'],
              update: jest.fn() as PersonAddressTypesMock['update'],
              deleteMany: jest.fn() as PersonAddressTypesMock['deleteMany'],
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

    service = module.get<AddressTypeService>(AddressTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an address type', async () => {
    const createAddressTypeDto: CreateAddressTypeDTO = {
      name: 'Residential',
    };

    (prismaService.person_address_types.create as jest.Mock).mockResolvedValue(
      addressTypeMock,
    );

    const result = await service.create(createAddressTypeDto);

    expect(prismaService.person_address_types.create).toHaveBeenCalledWith({
      data: createAddressTypeDto,
    });
    expect(result).toEqual(addressTypeMock);
  });

  it('should get an address type by ID', async () => {
    const addressTypeId = 1;

    (
      prismaService.person_address_types.findUnique as jest.Mock
    ).mockResolvedValue(addressTypeMock);

    const result = await service.getAddressTypeById(addressTypeId);

    expect(prismaService.person_address_types.findUnique).toHaveBeenCalledWith({
      where: { id: addressTypeId },
    });
    expect(result).toEqual(addressTypeMock);
  });

  it('should throw NotFoundException if address type not found', async () => {
    const addressTypeId = 999;

    (
      prismaService.person_address_types.findUnique as jest.Mock
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

    (prismaService.person_address_types.update as jest.Mock).mockResolvedValue({
      ...addressTypeMock,
      ...updateAddressTypeDto,
    });

    const result = await service.update(addressTypeId, updateAddressTypeDto);

    expect(prismaService.person_address_types.update).toHaveBeenCalledWith({
      where: { id: addressTypeId },
      data: updateAddressTypeDto,
    });
    expect(result).toEqual({ ...addressTypeMock, ...updateAddressTypeDto });
  });

  it('should remove address types', async () => {
    const deleteDto: DeleteDTO = { ids: [1, 2] };

    (
      prismaService.person_address_types.deleteMany as jest.Mock
    ).mockResolvedValue({
      count: 2,
    });

    const result = await service.remove(deleteDto);

    expect(prismaService.person_address_types.deleteMany).toHaveBeenCalledWith({
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
  });
});
