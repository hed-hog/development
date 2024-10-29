import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { PrismaModule } from '@hedhog/prisma';
import { PaginationModule } from '@hedhog/pagination';
import { AdminModule } from '@hedhog/admin';
import { FileController } from './file.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => AdminModule),
    forwardRef(() =>
      JwtModule.registerAsync({
        global: true,
        useFactory: () => {
          console.log(
            'AuthModule -> process.env.JWT_SECRET',
            process.env.JWT_SECRET,
          );
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
