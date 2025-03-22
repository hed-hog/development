import { PrismaModule } from '@hedhog/prisma';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Module({
  imports: [
    forwardRef(() =>
      JwtModule.registerAsync({
        global: true,
        useFactory: () => {
          return {
            secret: String(process.env.JWT_SECRET),
            global: true,
            signOptions: {
              expiresIn: process.env.JWT_EXPIRES_IN || '30d',
            },
          };
        },
      }),
    ),
    forwardRef(() => PrismaModule),
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
