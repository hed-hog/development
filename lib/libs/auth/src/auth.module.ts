import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'hadsys-prisma';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => {
      return {
        secret: String(process.env.JWT_SECRET),
        global: true,
        signOptions: { expiresIn: '30d' },
      }
    },
  }), PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService, {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule { }
