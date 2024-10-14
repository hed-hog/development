import { Test, TestingModule } from '@nestjs/testing';
import { ContactTypeService } from './contact-type.service';
import { PrismaService } from '@hedhog/prisma';
import {
  PageOrderDirection,
  PaginationDTO,
  PaginationService,
} from '@hedhog/pagination';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateContactTypeDTO } from './dto/create-contact-type.dto';
import { UpdateContactTypeDTO } from './dto/update-contact-type.dto';
import { DeleteDTO } from '../dto/delete.dto';

describe('ContactTypeService', () => {
  let service: ContactTypeService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const contactTypeMock = {
    id: 1,
    name: 'Email',
  };

  const paginationMock: PaginationDTO = {
    page: 1,
    pageSize: 10,
    search: '',
    sortField: '',
    sortOrder: PageOrderDirection.Asc,
    fields: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactTypeService,
        {
          provide: PrismaService,
          useValue: {
            person_contact_types: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
            createInsensitiveSearch: jest.fn(),
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

    service = module.get<ContactTypeService>(ContactTypeService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact type', async () => {
    const createContactTypeDto: CreateContactTypeDTO = {
      name: 'Email',
    };

    (prismaService.person_contact_types.create as jest.Mock).mockResolvedValue(
      contactTypeMock,
    );

    const result = await service.create(createContactTypeDto);

    expect(prismaService.person_contact_types.create).toHaveBeenCalledWith({
      data: createContactTypeDto,
    });
    expect(result).toEqual(contactTypeMock);
  });

  it('should get contact types with pagination', async () => {
    (paginationService.paginate as jest.Mock).mockResolvedValue([
      contactTypeMock,
    ]);

    const result = await service.getContactTypes('en', paginationMock);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.person_contact_types,
      paginationMock,
      {
        where: {},
        include: {
          person_contact_type_translations: {
            where: {
              locales: { code: 'en' },
            },
            select: { name: true },
          },
        },
      },
      'person_contact_type_translations',
    );
    expect(result).toEqual([contactTypeMock]);
  });

  it('should get a contact type by ID', async () => {
    (
      prismaService.person_contact_types.findUnique as jest.Mock
    ).mockResolvedValue(contactTypeMock);

    const result = await service.getContactTypeById(1);

    expect(prismaService.person_contact_types.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(contactTypeMock);
  });

  it('should throw NotFoundException if contact type not found by ID', async () => {
    (
      prismaService.person_contact_types.findUnique as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.getContactTypeById(999)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getContactTypeById(999)).rejects.toThrow(
      `ContactType with ID 999 not found`,
    );
  });

  it('should update a contact type', async () => {
    const updateContactTypeDto: UpdateContactTypeDTO = {
      name: 'Updated Name',
    };

    (prismaService.person_contact_types.update as jest.Mock).mockResolvedValue({
      ...contactTypeMock,
      ...updateContactTypeDto,
    });

    const result = await service.update(1, updateContactTypeDto);

    expect(prismaService.person_contact_types.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateContactTypeDto,
    });
    expect(result).toEqual({ ...contactTypeMock, ...updateContactTypeDto });
  });

  it('should remove contact types', async () => {
    const deleteDto: DeleteDTO = { ids: [1, 2] };

    (
      prismaService.person_contact_types.deleteMany as jest.Mock
    ).mockResolvedValue({
      count: 2,
    });

    const result = await service.remove(deleteDto);

    expect(prismaService.person_contact_types.deleteMany).toHaveBeenCalledWith({
      where: {
        id: { in: deleteDto.ids },
      },
    });
    expect(result).toEqual({ count: 2 });
  });

  it('should throw BadRequestException if no ids provided for deletion', async () => {
    const deleteDto: DeleteDTO = { ids: null };

    await expect(service.remove(deleteDto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.remove(deleteDto)).rejects.toThrow(
      `You must select at least one ContactType to delete.`,
    );
  });
});
