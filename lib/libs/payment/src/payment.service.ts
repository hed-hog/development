import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SettingService } from 'libs/admin/dist/setting/setting.service';
import { AbstractProvider } from './provider/abstract.provider';
import { EnumProvider } from './provider/provider.enum';
import { ProviderFactory } from './provider/provider.factory';

@Injectable()
export class PaymentService {
  private setting: Record<string, string>;
  private providerId: number;

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
  ) {}

  async getProvider(): Promise<AbstractProvider> {
    this.setting = await this.settingService.getSettingValues([
      'payment-stripe-secret-key',
      'payment-mercado-pago-public-key',
      'payment-mercado-pago-token',
      'payment-gateway',
    ]);

    if (!this.setting['payment-gateway']) {
      throw new BadRequestException(`Payment gateway not found in settings.`);
    }

    const providerName = this.setting['storage'];
    const provider = ProviderFactory.create(
      providerName as EnumProvider,
      this.setting,
    );

    const providerData = await this.prismaService.payment_gateway.findFirst({
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
}
