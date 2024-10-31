import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { CreatePersonContactDTO } from './dto/create-contact.dto';
import { UpdatePersonContactDTO } from './dto/update-contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let prismaService: PrismaService;
  let paginationService: PaginationService;

  const contactMock = {
    id: 1,
    person_id: 1,
    type_id: 2,
    primary: true,
    value: 'example@example.com',
    person_contact_type: {
      id: 2,
      name: 'Email',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: PrismaService,
          useValue: {
            person_contacts: {
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
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

    service = module.get<ContactService>(ContactService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const createContactDto: CreatePersonContactDTO = {
      type_id: 2,
      primary: true,
      value: 'example@example.com',
    };

    (prismaService.person_contacts.create as jest.Mock).mockResolvedValue(
      contactMock,
    );

    const result = await service.create(1, createContactDto);

    expect(prismaService.person_contacts.create).toHaveBeenCalledWith({
      data: {
        person_id: 1,
        ...createContactDto,
      },
    });
    expect(result).toEqual(contactMock);
  });

  it('should get contacts for a person', async () => {
    (paginationService.paginate as jest.Mock).mockResolvedValue([contactMock]);

    const result = await service.getContacts(1);

    expect(paginationService.paginate).toHaveBeenCalledWith(
      prismaService.person_contacts,
      { fields: 'id,person_id,type_id,primary,value' },
      {
        where: { person_id: 1 },
        include: {
          person_contact_type: { select: { id: true, name: true } },
        },
      },
    );
    expect(result).toEqual([contactMock]);
  });

  it('should get a contact by type ID', async () => {
    const typeId = 2;

    (prismaService.person_contacts.findFirst as jest.Mock).mockResolvedValue(
      contactMock,
    );

    const result = await service.getContactByTypeId(1, typeId);

    expect(prismaService.person_contacts.findFirst).toHaveBeenCalledWith({
      where: { person_id: 1, type_id: typeId },
      include: {
        person_contact_type: { select: { id: true, name: true } },
      },
    });
    expect(result).toEqual(contactMock);
  });

  it('should throw NotFoundException if contact not found by type ID', async () => {
    (prismaService.person_contacts.findFirst as jest.Mock).mockResolvedValue(
      null,
    );

    await expect(service.getContactByTypeId(1, 999)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getContactByTypeId(1, 999)).rejects.toThrow(
      `Type with ID 999 not found`,
    );
  });

  it('should get a contact by ID', async () => {
    (prismaService.person_contacts.findFirst as jest.Mock).mockResolvedValue(
      contactMock,
    );

    const result = await service.getContactById(1);

    expect(prismaService.person_contacts.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        person_contact_type: { select: { id: true, name: true } },
      },
    });
    expect(result).toEqual(contactMock);
  });

  it('should update a contact', async () => {
    const updateContactDto: UpdatePersonContactDTO = {
      type_id: 2,
      primary: true,
      value: 'new@example.com',
    };

    (prismaService.person_contacts.update as jest.Mock).mockResolvedValue({
      ...contactMock,
      ...updateContactDto,
    });

    const result = await service.update(1, updateContactDto);

    expect(prismaService.person_contacts.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateContactDto,
    });
    expect(result).toEqual({ ...contactMock, ...updateContactDto });
  });

  it('should remove a contact', async () => {
    (prismaService.person_contacts.delete as jest.Mock).mockResolvedValue(
      contactMock,
    );

    const result = await service.remove(1);

    expect(prismaService.person_contacts.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual({ count: 1 });
  });
});
