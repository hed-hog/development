import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { Payment_gatewaysService } from './payment_gateways.service';
import { Payment_gatewaysController } from './payment_gateways.controller';
@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [Payment_gatewaysController],
  providers: [Payment_gatewaysService],
  exports: [Payment_gatewaysService],
})
export class Payment_gatewaysModule {}
