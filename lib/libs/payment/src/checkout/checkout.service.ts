import { PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AbstractProvider } from './provider/abstract,provider';
import { EnumProvider } from './provider/provider.enum';
import { ProviderFactory } from './provider/provider.factory';

@Injectable()
export class CheckoutService {
  private providerId: number;
  private setting: Record<string, string>;

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
  ) {}

  async getProvider(): Promise<AbstractProvider> {
    this.setting = await this.settingService.getSettingValues([
      'payment-provider',
      'payment-mercado-pago-token',
    ]);

    if (!this.setting['storage']) {
      throw new BadRequestException(
        `You must set the storage provider in the setting.`,
      );
    }

    const providerName = this.setting['payment-provider'];
    const provider = ProviderFactory.create(
      providerName as EnumProvider,
      this.setting,
    );

    const providerData = await this.prismaService.gateway.findFirst({
      where: {
        slug: providerName,
      },
      select: {
        id: true,
      },
    });

    if (!providerData) {
      throw new BadRequestException(`Provider ${providerName} not found.`);
    }

    this.providerId = providerData.id;

    return provider;
  }

  async createPaymentIntent(amount: number, currency: string): Promise<any> {
    const provider = await this.getProvider();

    return provider.createPaymentIntent(amount, currency);
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    const provider = await this.getProvider();

    return provider.createSubscription(priceId, customerId);
  }
}
