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
    AuthModule,
    UserModule,
    CacheModule.register(),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
