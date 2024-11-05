import { PaginationModule } from '@hedhog/pagination';
import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SettingModule } from '@hedhog/setting';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => PaginationModule),
    forwardRef(() => SettingModule),
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
