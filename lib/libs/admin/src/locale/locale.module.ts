import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { LocaleController } from './locale.controller';
import { LocaleMiddleware } from './locale.middleware';
import { AdminModule } from '@hedhog/admin';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
  ],
  controllers: [LocaleController],
  providers: [LocaleService],
  exports: [LocaleService],
})
export class LocaleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocaleMiddleware).forRoutes('*');
  }
}
