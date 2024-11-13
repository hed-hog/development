"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@hedhog/prisma");
const testing_1 = require("@nestjs/testing");
const country_service_1 = require("./country.service");
describe('CountryService', () => {
    let service;
    let prismaService;
    const countriesMock = [
        { id: 1, name: 'Brazil' },
        { id: 2, name: 'United States' },
    ];
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                country_service_1.CountryService,
                {
                    provide: prisma_1.PrismaService,
                    useValue: {
                        countries: {
                            findMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();
        service = module.get(country_service_1.CountryService);
        prismaService = module.get(prisma_1.PrismaService);
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
//# sourceMappingURL=country.service.spec.js.map