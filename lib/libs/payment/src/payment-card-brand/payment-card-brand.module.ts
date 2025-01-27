import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { PaymentCardBrandService } from './payment-card-brand.service';
import { PaymentCardBrandController } from './payment-card-brand.controller';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule)
  ],
  controllers: [PaymentCardBrandController],
  providers: [PaymentCardBrandService],
  exports: [PaymentCardBrandService]
})
export class PaymentCardBrandModule {}
