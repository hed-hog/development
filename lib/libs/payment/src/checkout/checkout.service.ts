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

  async init(slug?: string, person_id?: number) {
    let payment: any = null;

    if (slug) {
      payment = this.prismaService.payment.findFirst({
        where: {
          slug,
          status_id: 1,
        },
      });

      if (payment && !payment.person_id && person_id) {
        await this.prismaService.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            person_id,
          },
        });
      }
    }

    if (!payment) {
      const item = await this.prismaService.item.findFirst();

      payment = await this.prismaService.payment.create({
        data: {
          gateway_id: this.providerId,
          person_id,
          status_id: 1,
          amount: item.price,
        },
      });

      await this.prismaService.payment_item.create({
        data: {
          payment_id: payment.id,
          item_id: item.id,
          unit_price: item.price,
        },
      });
    }

    return this.prismaService.payment.findUnique({
      where: {
        id: payment.id,
      },
      include: {
        payment_item: {
          include: {
            item: true,
          },
        },
        payment_method: true,
        card_brand: true,
        payment_status: true,
        person: true,
      },
    });
  }
}
