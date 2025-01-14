import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { Top100Service } from './top-100.service';
import { Top100Controller } from './top-100.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [Top100Controller],
  providers: [Top100Service],
  exports: [Top100Service]
})
export class Top100Module {}
