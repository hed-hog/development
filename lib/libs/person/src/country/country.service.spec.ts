import { PrismaService } from '@hedhog/prisma';
import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let prismaService: PrismaService;

  const countriesMock = [
    { id: 1, name: 'Brazil' },
    { id: 2, name: 'United States' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: PrismaService,
          useValue: {
            countries: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
  it('should return all countries', async () => {
    (prismaService.countries.findMany as jest.Mock).mockResolvedValue(
      countriesMock,
    );

    const result = await service.getAll();

    expect(prismaService.countries.findMany).toHaveBeenCalled();
    expect(result).toEqual(countriesMock);
  });*/
});
