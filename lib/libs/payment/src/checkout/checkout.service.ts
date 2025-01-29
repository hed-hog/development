import { PrismaService } from '@hedhog/prisma';
import { SettingService } from '@hedhog/setting';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EnumDiscountType } from '../disccount-type.enum';
import { EnumPaymentStatus } from '../payment-status.enum';
import { PaymentService } from '../payment/payment.service';
import { CreateDTO } from './dto/create.dto';
import { AbstractProvider } from './provider/abstract.provider';
import { EnumProvider } from './provider/provider.enum';
import { ProviderFactory } from './provider/provider.factory';

@Injectable()
export class CheckoutService implements OnModuleInit {
  private providerLoadedAt: number;
  private provider: AbstractProvider;
  private providerId: number;
  private setting: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
  ) {}

  async onModuleInit() {
    try {
      await this.getProvider();
    } catch (error) {
      console.error('CheckoutService', 'ERROR', error);
    }
  }

  async init({
    items,
    slug = '',
    userId = null,
    couponId = null,
  }: {
    items: number[];
    slug?: string;
    userId?: number;
    couponId?: number;
  }) {
    console.log('init', { items, slug, userId, couponId });

    if (!items || !items.length) {
      throw new BadRequestException('Items not found.');
    }

    await this.getProvider();

    console.log('provider loaded', this.providerId);

    const personId = await this.getPersonId(userId);

    console.log('personId', personId);

    let payment = await this.getPaymentBySlug(slug, personId);

    console.log('payment 1', payment);

    if (!payment) {
      payment = await this.createPayment(items, slug, personId);
      console.log('payment 2', payment);
    } else {
      payment = await this.updatePaymentItems(payment.id, items);
      console.log('payment 3', payment);
    }

    return this.getPaymentDetails(payment.id);
  }

  private async createPayment(
    items: number[],
    slug: string,
    personId?: number,
  ) {
    if (!slug) {
      slug = await this.getNewSlug();
    }

    const item = await this.getPaymentItems(items);

    const payment = await this.paymentService.create({
      gateway_id: this.providerId,
      person_id: personId ?? undefined,
      status_id: EnumPaymentStatus.PENDING,
      currency: 'brl',
      document: '00000000000',
      slug,
      amount: Number(item.reduce((acc, i) => acc + Number(i.price), 0)),
    });

    await this.prismaService.payment_item.createMany({
      data: item.map((i) => ({
        payment_id: payment.id,
        item_id: i.id,
        unit_price: i.price,
      })),
    });

    return payment;
  }

  private async getPaymentItems(items: number[]) {
    return this.prismaService.item.findMany({
      where: { id: { in: items } },
      select: { id: true, price: true },
    });
  }

  private async updatePaymentItems(paymentId: number, items: number[]) {
    await this.prismaService.payment_item.deleteMany({
      where: { payment_id: paymentId },
    });

    const item = await this.getPaymentItems(items);

    const payment = await this.prismaService.payment.update({
      where: { id: paymentId },
      data: {
        amount: Number(item.reduce((acc, i) => acc + Number(i.price), 0)),
      },
    });

    await this.prismaService.payment_item.createMany({
      data: item.map((i) => ({
        payment_id: paymentId,
        item_id: i.id,
        unit_price: i.price,
      })),
    });

    return payment;
  }

  async getPaymentSettings() {
    await this.getProvider();

    switch (this.setting['payment-provider']) {
      case EnumProvider.MERCADO_PAGO:
        return {
          publicKey: this.setting['payment-mercado-pago-public-key'],
        };

      default:
        return {};
    }
  }

  async getProvider(): Promise<AbstractProvider> {
    if (
      this.providerId > 0 &&
      this.providerLoadedAt < new Date().getTime() - 60000
    ) {
      return this.provider;
    }

    this.setting = await this.settingService.getSettingValues([
      'payment-provider',
      'payment-currency',
      'payment-mercado-pago-token',
      'payment-mercado-pago-public-key',
    ]);

    if (this.providerId > 0 && this.provider?.id === this.providerId) {
      return this.provider;
    }

    if (!this.setting['payment-provider']) {
      throw new BadRequestException(
        'You must set the payment provider in the settings.',
      );
    }

    const providerName = this.setting['payment-provider'];
    const providerData = await this.getProviderData(providerName);

    const provider = ProviderFactory.create(
      providerName as EnumProvider,
      providerData.id,
      this.setting,
      this.httpService,
    );

    this.providerId = providerData.id;
    this.providerLoadedAt = new Date().getTime();

    return provider;
  }

  private async getProviderData(providerName: string) {
    const providerData = await this.prismaService.payment_gateway.findFirst({
      where: { slug: providerName },
      select: { id: true },
    });

    if (!providerData) {
      throw new BadRequestException(`Provider ${providerName} not found.`);
    }

    return providerData;
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
    console.log('createPaymentIntent', {
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
    });

    const provider = await this.getProvider();
    return provider.createPaymentIntent(0, this.setting['payment-currency']);
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    const provider = await this.getProvider();
    // return provider.createSubscription(priceId, customerId);
  }

  async getNewSlug() {
    const slug = uuidv4();
    const exists = await this.prismaService.payment.count({ where: { slug } });
    return exists ? this.getNewSlug() : slug;
  }

  private async getPersonId(userId?: number): Promise<number | null> {
    if (!userId) return null;

    const person = await this.prismaService.person.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    return person ? person.id : null;
  }

  private async getPaymentBySlug(
    slug?: string,
    personId?: number,
  ): Promise<any> {
    if (!slug) return null;

    const payment = await this.prismaService.payment.findFirst({
      where: { slug, status_id: EnumPaymentStatus.PENDING },
    });

    if (payment && !payment.person_id && personId) {
      await this.prismaService.payment.update({
        where: { id: payment.id },
        data: { person_id: personId },
      });
    }

    return payment;
  }

  private async getPaymentDetails(paymentId: number): Promise<any> {
    console.log('getPaymentDetails', paymentId);
    return this.prismaService.payment.findUnique({
      where: { id: paymentId },
      include: {
        payment_item: { include: { item: true } },
        payment_method: true,
        payment_card_brand: true,
        payment_status: true,
        person: true,
        payment_coupon: true,
      },
    });
  }

  async setCoupon(couponCode: string, paymentSlug: string) {
    const payment = await this.getPaymentWithItems(paymentSlug);

    if (!payment || payment.status_id !== EnumPaymentStatus.PENDING) {
      throw new BadRequestException('Payment not found or not pending.');
    }

    if (!couponCode) {
      if (payment.coupon_id > 0) {
        const coupon = await this.prismaService.payment_coupon.findUnique({
          where: { id: payment.coupon_id },
          select: { uses_qtd: true },
        });

        await this.prismaService.payment_coupon.update({
          where: { id: payment.coupon_id },
          data: { uses_qtd: coupon.uses_qtd - 1 },
        });
      }

      return this.paymentService.update({
        id: payment.id,
        data: { coupon_id: null, discount: 0 },
      });
    }

    const coupon = await this.getCouponWithItems(couponCode);

    if (
      coupon.uses_limit > 0 &&
      (coupon.uses_qtd ?? 0) >= (coupon.uses_limit ?? 0)
    ) {
      throw new BadRequestException('Consumption coupon or usage limit.');
    }

    const itemsFromPaymentAndCoupon = this.getItemsFromPaymentAndCoupon(
      payment,
      coupon,
    );

    if (itemsFromPaymentAndCoupon?.length) {
      return this.applyCouponDiscount(
        payment.id,
        coupon,
        Number(payment.amount),
      );
    } else {
      throw new BadRequestException('Coupon not is valid.');
    }
  }

  private async getPaymentWithItems(slug: string) {
    return this.prismaService.payment.findUnique({
      where: { slug },
      include: {
        payment_item: { include: { item: true } },
      },
    });
  }

  private async getCouponWithItems(code: string) {
    return this.prismaService.payment_coupon.findFirst({
      where: {
        code,
        active: true,
        starts_at: { lte: new Date() },
        OR: [{ ends_at: { gte: new Date() } }, { ends_at: null }],
      },
      include: {
        payment_coupon_item: { include: { item: true } },
      },
    });
  }

  private getItemsFromPaymentAndCoupon(payment: any, coupon: any) {
    console.log('getItemsFromPaymentAndCoupon', {
      payment_item: payment.payment_item,
      coupon_payment_coupon_item: coupon.payment_coupon_item,
    });

    return payment.payment_item?.filter((item) =>
      (coupon.payment_coupon_item ?? [])
        .map((ci) => ci.item_id)
        .includes(item.item_id),
    );
  }

  private async applyCouponDiscount(
    paymentId: number,
    coupon: any,
    paymentAmount: number,
  ) {
    switch (coupon.discount_type_id) {
      case EnumDiscountType.DISCOUNT_FIXED_VALUE:
      case EnumDiscountType.PROMOTIONAL_PRICE:
        console.log('applyCouponDiscount', {
          paymentId,
          couponId: coupon.id,
          discount: Number(coupon.value),
        });
        return this.paymentService.update({
          id: paymentId,
          data: { coupon_id: coupon.id, discount: Number(coupon.value) },
        });

      case EnumDiscountType.DISCOUNT_PERCENTAGE_VALUE:
        const valueToReduce =
          (Number(paymentAmount) * Number(coupon.value)) / 100;

        console.log('applyCouponDiscount', {
          paymentId,
          couponId: coupon.id,
          discount: Number(valueToReduce),
        });

        return this.paymentService.update({
          id: paymentId,
          data: { coupon_id: coupon.id, discount: Number(valueToReduce) },
        });
    }
  }
}
