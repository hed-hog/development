import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PaymentService } from '../payment/payment.service';
import { CreateDTO } from './dto/create.dto';
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
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
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

  async createPaymentIntent({
    token,
    paymentMethodId,
    issuerId,
    installments,
    identificationNumber,
    orderId,
    cardFirstSixDigits,
    cardLastFourDigits,
    name,
    email,
    phone,
    couponId,
  }: CreateDTO): Promise<any> {
    const provider = await this.getProvider();

    return provider.createPaymentIntent(0, 'brl');
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    const provider = await this.getProvider();

    //return provider.createSubscription(priceId, customerId);
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
            person_id: person_id ?? undefined,
          },
        });
      }
    }

    if (!payment) {
      const item = await this.prismaService.item.findFirst();
      /*
      payment = await this.prismaService.payment.create({
        data: {
          gateway_id: this.providerId,
          person_id: person_id ?? undefined,
          status_id: 1,
          amount: item.price,
          currency: 'brl',
          document: '00000000000',
          slug: Math.random().toString(36).substring(7),
        },
      });
      */
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
  /*
  async setCoupon(paymentId: number, couponId: number) {
    const payment = await this.paymentService.get(paymentId);
    const coupon = await this.couponsService.findOne(couponId);

    if ((coupon.usedQtd ?? 0) >= (coupon.usesLimit ?? 0)) {
        throw new BadRequestException('Consumption coupon or usage limit.');
    }

    const couponItems = (coupon.CouponItem ?? []).map(
        (i: CouponItem) => i.itemId,
    );

    const itemsFromOrderAndCoupon = order.OrderItem?.filter(item =>
        couponItems.includes(item.itemId),
    );

    if (itemsFromOrderAndCoupon?.length) {
        switch (coupon.discountTypeId) {
            case EnumCouponDiscountType.DISCOUNT_FIXED_VALUE:
            case EnumCouponDiscountType.PROMOTIONAL_PRICE:
                return this.set(order.id, {
                    couponId,
                    discount: Number(coupon.value.toFixed(2)),
                });

            case EnumCouponDiscountType.DISCOUNT_PERCENTAGE_VALUE:
                const valueToReduce = (order.total * coupon.value) / 100;

                return this.set(order.id, {
                    couponId,
                    discount: Number(valueToReduce.toFixed(2)),
                });
        }
        return order;
    } else {
        throw new BadRequestException('Coupon not is valid.');
    }
}*/
}
