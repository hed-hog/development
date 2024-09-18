import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  getProvider() {
    console.log('getProvider', (this as any)._engineConfig.activeProvider);
    return (this as any)._engineConfig.activeProvider;
  }

  isPostgres() {
    return this.getProvider() === 'postgres';
  }

  isMysql() {
    return this.getProvider() === 'mysql';
  }
}
