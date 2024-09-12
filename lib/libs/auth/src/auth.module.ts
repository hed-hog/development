import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@hedhog/prisma';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MailModule } from '@hedhog/mail';

@Module({
  imports: [
    forwardRef(() =>
      JwtModule.registerAsync({
        useFactory: () => {
          return {
            secret: String(process.env.JWT_SECRET),
            global: true,
            signOptions: {
              expiresIn: String(process.env.JWT_EXPIRES_IN) ?? '30d',
            },
          };
        },
      }),
    ),
    forwardRef(() => PrismaModule),
    forwardRef(() => MailModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
