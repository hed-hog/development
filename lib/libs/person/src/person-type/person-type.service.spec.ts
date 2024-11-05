import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { PersonTypeService } from './person-type.service';

describe('PersonTypeService', () => {
  let service: PersonTypeService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const personTypeMock = {
    id: 1,
    name: 'Customer',
  };

  const paginationMockResult = [personTypeMock];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonTypeService,
        {
          provide: PrismaService,
          useValue: {
            person_type: {
              create: jest.fn().mockResolvedValue(personTypeMock),
              findUnique: jest.fn().mockResolvedValue(personTypeMock),
              update: jest.fn().mockResolvedValue(personTypeMock),
              deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
            createInsensitiveSearch: jest.fn().mockReturnValue([]),
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

    service = module.get<PersonTypeService>(PersonTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
  it('should create a person type', async () => {
    const createPersonTypeDto: CreatePersonTypeDTO = {
      name: 'Customer',
    };

    const result = await service.create(createPersonTypeDto);

    expect(prismaService.person_type.create).toHaveBeenCalledWith({
      data: createPersonTypeDto,
    });
    expect(result).toEqual(personTypeMock);
  });

  it('should get person types with pagination', async () => {
    const locale = 'en';
    const paginationParams: PaginationDTO = {
      page: 1,
      pageSize: 10,
      search: '',
      sortField: '',
      sortOrder: PageOrderDirection.Asc,
      fields: '',
    };

    const result = await service.getPersonTypes(locale, paginationParams);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.person_type,
      paginationParams,
      {
        where: {
          OR: [],
        },
        include: {
          person_type_locale: {
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
      'person_type_locale',
    );
    expect(result).toEqual(paginationMockResult);
  });

  it('should get person type by ID', async () => {
    const personTypeId = 1;

    const result = await service.getPersonTypeById(personTypeId);

    expect(prismaService.person_type.findUnique).toHaveBeenCalledWith({
      where: { id: personTypeId },
    });
    expect(result).toEqual(personTypeMock);
  });

  it('should throw NotFoundException if person type not found', async () => {
    const personTypeId = 999; // Non-existent ID

    (prismaService.person_type.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.getPersonTypeById(personTypeId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getPersonTypeById(personTypeId)).rejects.toThrow(
      `PersonType with ID ${personTypeId} not found`,
    );
  });

  it('should update a person type', async () => {
    const personTypeId = 1;
    const updatePersonTypeDto: UpdatePersonTypeDTO = {
      name: 'Updated Customer',
    };

    const result = await service.update(personTypeId, updatePersonTypeDto);

    expect(prismaService.person_type.update).toHaveBeenCalledWith({
      where: { id: personTypeId },
      data: updatePersonTypeDto,
    });
    expect(result).toEqual(personTypeMock);
  });

  it('should remove person types', async () => {
    const deleteDto: DeleteDTO = { ids: [1, 2] };

    const result = await service.remove(deleteDto);

    expect(prismaService.person_type.deleteMany).toHaveBeenCalledWith({
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
      `You must select at least one PersonType to delete.`,
    );
  });*/
});
