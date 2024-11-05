import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return this.prismaService.country.findMany();
  }
}
