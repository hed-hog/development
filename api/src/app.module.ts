import { SettingModule } from '@hedhog/setting';
import { PermissionModule } from '@hedhog/permission';
import { ScreenModule } from '@hedhog/screen';
import { AuthModule } from '@hedhog/auth';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from '@hedhog/user';
import { PrismaModule } from '@hedhog/prisma';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CacheModule.register(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    AuthModule,
    ScreenModule,
    PermissionModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

      