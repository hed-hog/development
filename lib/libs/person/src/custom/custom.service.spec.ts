import { Test, TestingModule } from '@nestjs/testing';
import { CustomService } from './custom.service';
import { PrismaService } from '@hedhog/prisma';
import { PaginationService } from '@hedhog/pagination';
import { CreatePersonCustomDTO } from './dto/create-custom.dto';
import { UpdatePersonCustomDTO } from './dto/update-custom.dto';
import { NotFoundException } from '@nestjs/common';

describe('CustomService', () => {
  let service: CustomService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomService,
        {
          provide: PrismaService,
          useValue: {
            person_customs: personCustomsMock,
          },
        },
        {
          provide: PaginationService,
          useValue: paginationMock,
        },
      ],
    }).compile();

    service = module.get<CustomService>(CustomService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a custom entry', async () => {
    const createCustomDto: CreatePersonCustomDTO = {
      type_id: 1,
      name: 'Custom Name',
      value: 'Custom Value',
    };

    const result = await service.create(1, createCustomDto);

    expect(prismaService.person_customs.create).toHaveBeenCalledWith({
      data: {
        person_id: 1,
        ...createCustomDto,
      },
    });
    expect(result).toEqual(customMock);
  });

  it('should get customs by person ID', async () => {
    const personId = 1;

    const result = await service.getCustoms(personId);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.person_customs,
      {
        fields: 'id,person_id,type_id,name,value',
      },
      {
        where: {
          person_id: personId,
        },
        include: {
          person_custom_types: {
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

    expect(prismaService.person_customs.findFirst).toHaveBeenCalledWith({
      where: {
        person_id: personId,
        id: customId,
      },
      include: {
        person_custom_types: {
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

    (prismaService.person_customs.findFirst as jest.Mock).mockResolvedValue(
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

    expect(prismaService.person_customs.update).toHaveBeenCalledWith({
      where: { id: customId },
      data: updateCustomDto,
    });
    expect(result).toEqual(customMock);
  });

  it('should remove a custom entry', async () => {
    const customId = 1;

    const result = await service.remove(customId);

    expect(prismaService.person_customs.delete).toHaveBeenCalledWith({
      where: {
        id: customId,
      },
    });
    expect(result).toEqual({ count: 1 });
  });
});
