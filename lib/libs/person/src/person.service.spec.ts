import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { PrismaService } from '@hedhog/prisma';
import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePersonDTO } from './dto/create-person.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { DeleteDTO } from './dto/delete.dto';
import { itemTranslations } from '@hedhog/utils';

describe('PersonService', () => {
  let service: PersonService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const personMock = {
    id: 1,
    name: 'John Doe',
  };

  const paginationMockResult = {
    data: [personMock],
    total: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: PrismaService,
          useValue: {
            persons: {
              create: jest.fn().mockResolvedValue(personMock),
              findUnique: jest.fn().mockResolvedValue(personMock),
              update: jest.fn().mockResolvedValue(personMock),
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

    service = module.get<PersonService>(PersonService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a person', async () => {
    const createPersonDto: CreatePersonDTO = {
      name: 'John Doe',
      type_id: 1,
    };

    const result = await service.create(createPersonDto);

    expect(prismaService.persons.create).toHaveBeenCalledWith({
      data: createPersonDto,
    });
    expect(result).toEqual(personMock);
  });

  it('should get persons with pagination', async () => {
    const locale = 'en';
    const paginationParams: PaginationDTO = {
      page: 1,
      pageSize: 10,
      search: '',
      sortField: '',
      sortOrder: PageOrderDirection.Asc,
      fields: '',
    };

    const result = await service.getPersons(locale, paginationParams);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.persons,
      paginationParams,
      {
        where: {
          OR: [],
        },
        include: {
          person_types: expect.any(Object),
          person_documents: expect.any(Object),
          person_contacts: expect.any(Object),
        },
      },
    );

    expect(result).toEqual(paginationMockResult);
  });

  it('should get person by ID', async () => {
    const personId = 1;

    const result = await service.getPersonById(personId);

    expect(prismaService.persons.findUnique).toHaveBeenCalledWith({
      where: { id: personId },
      include: expect.any(Object),
    });

    expect(result).toEqual(personMock);
  });

  it('should throw NotFoundException if person not found', async () => {
    const personId = 999; // Non-existent ID

    (prismaService.persons.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.getPersonById(personId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getPersonById(personId)).rejects.toThrow(
      `Person with ID ${personId} not found`,
    );
  });

  it('should update a person', async () => {
    const personId = 1;
    const updatePersonDto: UpdatePersonDTO = {
      name: 'Jane Doe',
      type_id: 1,
    };

    const result = await service.update(personId, updatePersonDto);

    expect(prismaService.persons.update).toHaveBeenCalledWith({
      where: { id: personId },
      data: updatePersonDto,
    });

    expect(result).toEqual(personMock);
  });

  it('should remove persons', async () => {
    const deleteDto: DeleteDTO = { ids: [1, 2] };

    const result = await service.remove(deleteDto);

    expect(prismaService.persons.deleteMany).toHaveBeenCalledWith({
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
      `You must select at least one person to delete.`,
    );
  });
});
