import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDTO } from '../dto/delete.dto';
import { CustomTypeService } from './custom-type.service';
import { CreateCustomTypeDTO } from './dto/create-custom-type.dto';
import { UpdateCustomTypeDTO } from './dto/update-custom-type.dto';

describe('CustomTypeService', () => {
  let service: CustomTypeService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const customTypeMock = {
    id: 1,
    name: 'Custom Type Name',
  };

  const paginationMockResult = [customTypeMock];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomTypeService,
        {
          provide: PrismaService,
          useValue: {
            person_custom_type: {
              create: jest.fn().mockResolvedValue(customTypeMock),
              findUnique: jest.fn().mockResolvedValue(customTypeMock),
              update: jest.fn().mockResolvedValue(customTypeMock),
              deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            createInsensitiveSearch: jest.fn().mockReturnValue([]), // Adjust if necessary
          },
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: jest.fn().mockResolvedValue(paginationMockResult),
          },
        },
      ],
    }).compile();

    service = module.get<CustomTypeService>(CustomTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a custom type', async () => {
    const createCustomTypeDto: CreateCustomTypeDTO = {
      name: 'Custom Type Name',
    };

    const result = await service.create(createCustomTypeDto);

    expect(prismaService.person_custom_type.create).toHaveBeenCalledWith({
      data: createCustomTypeDto,
    });
    expect(result).toEqual(customTypeMock);
  });
  /*
  it('should get custom types with pagination', async () => {
    const paginationParams: PaginationDTO = {
      page: 1,
      pageSize: 10,
      search: '',
      sortField: '',
      sortOrder: PageOrderDirection.Asc,
      fields: '',
    };

    const result = await service.getCustomTypes(paginationParams);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.person_custom_type,
      paginationParams,
      {
        where: {
          OR: [],
        },
      },
    );
    expect(result).toEqual(paginationMockResult);
  });
*/
  it('should get custom type by ID', async () => {
    const id = 1;

    const result = await service.getCustomTypeById(id);

    expect(prismaService.person_custom_type.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual(customTypeMock);
  });

  it('should throw NotFoundException if custom type not found', async () => {
    const id = 999;
    (
      prismaService.person_custom_type.findUnique as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.getCustomTypeById(id)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getCustomTypeById(id)).rejects.toThrow(
      `customType with ID ${id} not found`,
    );
  });

  it('should update a custom type', async () => {
    const id = 1;
    const updateCustomTypeDto: UpdateCustomTypeDTO = {
      name: 'Updated Custom Type Name',
    };

    const result = await service.update(id, updateCustomTypeDto);

    expect(prismaService.person_custom_type.update).toHaveBeenCalledWith({
      where: { id },
      data: updateCustomTypeDto,
    });
    expect(result).toEqual(customTypeMock);
  });

  it('should remove custom types', async () => {
    const deleteDto: DeleteDTO = { ids: [1, 2] };

    const result = await service.remove(deleteDto);

    expect(prismaService.person_custom_type.deleteMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: deleteDto.ids,
        },
      },
    });
    expect(result).toEqual({ count: 1 });
  });

  it('should throw BadRequestException if no IDs provided for deletion', async () => {
    const deleteDto: DeleteDTO = { ids: undefined };

    await expect(service.remove(deleteDto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.remove(deleteDto)).rejects.toThrow(
      `You must select at least one customType to delete.`,
    );
  });
});
