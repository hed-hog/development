import { AdminModule } from '@hedhog/admin';
import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => AdminModule),
    forwardRef(() =>
      JwtModule.registerAsync({
        global: true,
        useFactory: () => {
          return {
            secret: String(process.env.JWT_SECRET),
          };
        },
      }),
    ),
  ],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
