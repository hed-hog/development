import { SettingService } from '@hedhog/admin';
import {
  ContactService,
  PersonContactTypeEnum,
  PersonDocumentTypeEnum,
  PersonTypeEnum,
} from '@hedhog/contact';
import { MailService } from '@hedhog/mail';
import { PrismaService } from '@hedhog/prisma';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  forwardRef,
} from '@nestjs/common';
import {
  EventEmitter2,
  EventEmitterReadinessWatcher,
} from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { DiscountTypeEnum } from '../discount-type/discount-type.enum';
import { getPaymentEmail } from '../emails';
import { PaymentGatewayEnum } from '../payment-gateway/payment-gateway.enum';
import { PaymentMethodEnum } from '../payment-method/payment-method.enum';
import { PaymentStatusEnum } from '../payment-status/payment-status.enum';
import { PaymentService } from '../payment/payment.service';
import { CreditCardDTO } from './dto/credit-card.dto';
import { PixDTO } from './dto/pix.dto';
import { ResetDTO } from './dto/reset.dto';
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
    private eventEmitter: EventEmitter2,
    private eventEmitterReadinessWatcher: EventEmitterReadinessWatcher,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
  ) { }

  async onModuleInit() {
    try {
      await this.getProvider();
    } catch (error) {
      console.error('CheckoutService', 'ERROR', error);
    }
  }

  async getProviderPayment(id: string): Promise<any> {
    const provider = await this.getProvider();
    return provider.getPayment(id);
  }

  async init({
    items = [],
    slug = '',
    userId = null,
    coupon = null,
  }: {
    items: number[];
    slug?: string;
    userId?: number;
    coupon?: string;
  }) {
    if (!items || !items.length) {
      const item = await this.prismaService.item.findFirst({
        select: {
          id: true,
        },
      });

      if (!item) {
        throw new BadRequestException('Item not found.');
      }

      items = [item.id];
    }

    await this.getProvider();

    const personId = await this.getPersonId(userId);

    let payment = await this.getPaymentBySlug(slug, personId);

    if (!payment) {
      payment = await this.createPayment(items, personId);
    } else {
      payment = await this.updatePaymentItems(payment.id, items);
    }

    try {
      if (coupon) {
        await this.setCoupon(coupon, payment.slug);
      }
    } catch (error: any) {
      console.error('Error Payment Init', error);
    }

    return this.getPaymentDetails(payment.id);
  }

  private async hasMethodDiscount(paymentId: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { id: paymentId },
      select: {
        method_id: true,
        payment_item: {
          include: { item: { include: { payment_method_item: true } } },
        },
      },
    });

    return (
      payment.payment_item.filter((pi) =>
        pi.item.payment_method_item.some(
          (pmi) => pmi.payment_method_id === payment.method_id,
        ),
      ).length > 0
    );
  }

  async putMethod(paymentId: number, methodId: number) {
    await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        method_id: methodId,
        discount: "0",
      },
    });

    await this.checkApplyMethodDiscount(paymentId);

    return this.getPaymentDetails(paymentId);
  }

  async verifyPixDiscount(paymentId: number) {

    const payment = await this.getPaymentDetails(paymentId);

    const pixDiscount = this.setting['payment-method-pix-discount'];

    if (pixDiscount && !isNaN(+pixDiscount) && +pixDiscount > 0 && payment.method_id === PaymentMethodEnum.PIX) {

      const currentDiscount = (payment?.discount ?? 0);

      const discount = +currentDiscount + +((payment.amount - currentDiscount) * (+pixDiscount / 100));

      await this.paymentService.update({
        id: paymentId,
        data: {
          discount,
        },
      });

    }

  }

  private async checkApplyMethodDiscount(paymentId: number) {
    const discountCumulative =
      String(this.setting['payment-discount-cumulative']) === 'true';

    const payment = await this.prismaService.payment.findUnique({
      where: { id: paymentId },
      include: {
        payment_item: {
          include: { item: { include: { payment_method_item: true } } },
        },
        payment_coupon: true,
      },
    });

    const paymentMethodId = payment.method_id;
    let hasMethodDiscount = false;
    for (let i = 0; i < payment.payment_item.length; i++) {
      const paymentMethodItem = payment.payment_item[
        i
      ].item.payment_method_item.find(
        (pmi) => pmi.payment_method_id === paymentMethodId,
      );

      if (!paymentMethodItem) {
        payment.payment_item[i].unit_price = payment.payment_item[i].item.price;
      } else {
        hasMethodDiscount = true;

        const discountValue = paymentMethodItem.value;
        const discountTyepId = paymentMethodItem.discount_type_id;

        switch (discountTyepId) {
          case DiscountTypeEnum.DISCOUNT_FIXED_VALUE:
            payment.payment_item[i].unit_price = new Prisma.Decimal(
              payment.payment_item[i].item.price,
            ).minus(new Prisma.Decimal(discountValue));
            break;
          case DiscountTypeEnum.DISCOUNT_PERCENTAGE_VALUE:
            payment.payment_item[i].unit_price = new Prisma.Decimal(
              payment.payment_item[i].item.price,
            ).minus(
              new Prisma.Decimal(payment.payment_item[i].item.price)
                .times(discountValue)
                .div(100),
            );
            break;
          case DiscountTypeEnum.PROMOTIONAL_PRICE:
            payment.payment_item[i].unit_price = new Prisma.Decimal(
              discountValue,
            );
            break;
          default:
            payment.payment_item[i].unit_price =
              payment.payment_item[i].item.price;
        }
      }
    }

    if (hasMethodDiscount && !discountCumulative && payment.coupon_id) {
      await this.removeCoupon(paymentId, payment.coupon_id);
    }

    const queries = [];

    for (let i = 0; i < payment.payment_item.length; i++) {
      queries.push(
        this.prismaService.payment_item.update({
          where: { id: payment.payment_item[i].id },
          data: {
            unit_price: payment.payment_item[i].unit_price,
          },
        }),
      );
    }

    await this.prismaService.$transaction(queries);

    let amount = Number(
      payment.payment_item.reduce(
        (acc, i) => acc + Number(i.unit_price) * i.quantity,
        0,
      ),
    );

    if (amount < 0) {
      amount = 0;
    }

    await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amount,
      },
    });

    await this.verifyPixDiscount(paymentId);

    if (payment.coupon_id) {
      await this.setCoupon(payment.payment_coupon.code, payment.slug);
    }
  }

  private async createPayment(items: number[], personId?: number) {
    const slug = await this.getNewSlug();
    const item = await this.getPaymentItems(items);

    let amount = Number(item.reduce((acc, i) => acc + Number(i.price), 0));

    if (amount < 0) {
      amount = 0;
    }

    const payment = await this.paymentService.create({
      gateway_id: this.providerId,
      person_id: personId ?? undefined,
      status_id: PaymentStatusEnum.PENDING,
      currency: 'brl',
      method_id: PaymentMethodEnum.PIX,
      slug,
      amount,
    });

    await this.prismaService.payment_item.createMany({
      data: item.map((i) => ({
        payment_id: payment.id,
        item_id: i.id,
        unit_price: i.price,
      })),
    });

    await this.checkApplyMethodDiscount(payment.id);

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

    let amount = Number(item.reduce((acc, i) => acc + Number(i.price), 0));

    if (amount < 0) {
      amount = 0;
    }

    const payment = await this.prismaService.payment.update({
      where: { id: paymentId },
      data: {
        amount,
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
          creditEnabled: this.setting['payment-method-credit-enabled'],
          debitEnabled: this.setting['payment-method-debit-enabled'],
          pixEnabled: this.setting['payment-method-pix-enabled'],
          maxInstallments: this.setting['payment-max-installments'],
          pixDiscount: this.setting['payment-method-pix-discount'],
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
      'url',
      'payment-provider',
      'payment-currency',
      'payment-mercado-pago-token',
      'payment-mercado-pago-public-key',
      'payment-discount-cumulative',
      'payment-method-credit-enabled',
      'payment-method-debit-enabled',
      'payment-method-pix-enabled',
      'payment-max-installments',
      'payment-method-pix-discount',
      'payment-coupon-exact-items-quantity',
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

    this.provider = ProviderFactory.create(
      providerName as EnumProvider,
      providerData.id,
      this.setting,
      this.httpService,
    );

    this.providerId = providerData.id;
    this.providerLoadedAt = new Date().getTime();

    return this.provider;
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

  async createPaymentPix({
    email,
    identificationNumber,
    identificationType,
    name,
    paymentSlug,
    phone,
  }: PixDTO) {
    try {
      const provider = await this.getProvider();

      if (!this.setting['payment-method-pix-enabled']) {
        throw new BadRequestException('Payment method not enabled.');
      }

      const { person } = await this.contactService.getPersonOrCreateIfNotExists(
        identificationType === 'CPF'
          ? PersonTypeEnum.PHYSICAL
          : PersonTypeEnum.LEGAL,
        name,
        email,
        phone,
        identificationType === 'CPF' ? identificationNumber : '',
        identificationType === 'CNPJ' ? identificationNumber : '',
      );

      await this.contactService.addDocumentIfNotExists(
        person.id,
        identificationNumber,
        identificationType === 'CPF'
          ? PersonDocumentTypeEnum.CPF
          : PersonDocumentTypeEnum.CNPJ,
      );

      await this.contactService.addContactIfNotExists(
        person.id,
        phone,
        PersonContactTypeEnum.PHONE,
      );

      const payment = await this.prismaService.payment.update({
        where: { slug: paymentSlug },
        data: {
          installments: 1,
          method_id: PaymentMethodEnum.PIX,
          person_id: person.id,
          document: identificationNumber,
        },
        include: { payment_item: { include: { item: true } } },
      });

      const items = payment.payment_item.map((pi) => ({
        id: pi.item_id,
        title: pi.item.name,
        description: pi.item.name,
        quantity: pi.quantity,
        unit_price: pi.unit_price,
      }));

      const { firstName, lastName } = await this.getFirstAndLastName(name);

      const paymentPix = await provider.createPaymentPix({
        transactionAmount: Number(payment.amount) - Number(payment.discount),
        description: '',
        externalReference: payment.slug,
        firstName,
        lastName,
        payerEmail: email,
        payerIdentificationNumber: identificationNumber,
        payerIdentificationType: identificationType,
        items,
      });

      await this.saveQRCode(payment.id, paymentPix);

      await this.mailService.send({
        to: email,
        subject: 'Detalhes do Pedido',
        body: getPaymentEmail({
          message:
            'Seu pedido foi gerado com sucesso. Confira os detalhes abaixo:',
          title: 'Detalhes do Pedido',
          discount: Number(payment.discount),
          total: Number(payment.amount) - Number(payment.discount),
          method:
            payment.method_id === PaymentMethodEnum.CREDIT_CARD
              ? 'credit-card'
              : 'pix',
          items: payment.payment_item.map((pi) => ({
            quantity: pi.quantity,
            name: pi.item.name,
            price: Number(pi.unit_price) * pi.quantity,
            unitPrice: Number(pi.unit_price),
          })),
        }),
      });

      return this.getPaymentDetails(payment.id);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async saveQRCode(paymentId: number, paymentPix: any) {
    if (this.setting['payment-provider'] === EnumProvider.MERCADO_PAGO) {
      const transactionData =
        paymentPix?.point_of_interaction?.transaction_data;
      await this.setPaymentValue(
        paymentId,
        'qr_code',
        transactionData?.qr_code,
      );
      await this.setPaymentValue(
        paymentId,
        'qr_code_img',
        transactionData?.qr_code_base64,
      );
      await this.setPaymentValue(
        paymentId,
        'date_of_expiration',
        paymentPix?.date_of_expiration,
      );
    }
  }

  async setPaymentValue(paymentId: number, name: string, value: string) {
    await this.prismaService.payment_value.deleteMany({
      where: { payment_id: paymentId, name },
    });

    return this.prismaService.payment_value.create({
      data: {
        payment_id: paymentId,
        name,
        value,
      },
    });
  }

  private async getFirstAndLastName(name: string) {
    const names = name.split(' ');
    const firstName = names.shift();
    const lastName = names.join(' ');
    return { firstName, lastName };
  }

  async createPaymentCreditCard({
    token,
    paymentMethodId,
    paymentMethodType,
    issuerId,
    installments,
    identificationNumber,
    paymentSlug,
    identificationType,
    name,
    email,
    phone,
  }: CreditCardDTO): Promise<any> {
    try {
      const provider = await this.getProvider();

      if (installments > Number(this.setting['payment-max-installments'])) {
        throw new BadRequestException('Installments greater than allowed.');
      }

      if (
        paymentMethodType === 'credit' &&
        !this.setting['payment-method-credit-enabled']
      ) {
        throw new BadRequestException('Payment method not enabled.');
      }

      if (
        paymentMethodType === 'debit' &&
        !this.setting['payment-method-debit-enabled']
      ) {
        throw new BadRequestException('Payment method not enabled.');
      }

      const { person, created, code } =
        await this.contactService.getPersonOrCreateIfNotExists(
          identificationType === 'CPF'
            ? PersonTypeEnum.PHYSICAL
            : PersonTypeEnum.LEGAL,
          name,
          email,
          phone,
          identificationType === 'CPF' ? identificationNumber : '',
          identificationType === 'CNPJ' ? identificationNumber : '',
        );

      await this.contactService.addDocumentIfNotExists(
        person.id,
        identificationNumber,
        identificationType === 'CPF'
          ? PersonDocumentTypeEnum.CPF
          : PersonDocumentTypeEnum.CNPJ,
      );

      await this.contactService.addContactIfNotExists(
        person.id,
        phone,
        PersonContactTypeEnum.PHONE,
      );

      let payment = await this.prismaService.payment.findFirst({
        where: {
          slug: paymentSlug,
        },
        include: {
          payment_item: {
            include: {
              item: {
                include: {
                  payment_installment_item: true,
                },
              },
            },
          },
        },
      });

      if (!payment) {
        throw new BadRequestException('Payment not found.');
      }

      for (let i = 0; i < payment.payment_item.length; i++) {
        if (
          payment.payment_item[i].item.payment_installment_item &&
          payment.payment_item[i].item.payment_installment_item
            .max_installments < installments
        ) {
          throw new BadRequestException(
            `Installments greater than allowed on ${payment.payment_item[i].item.name}.`,
          );
        }
      }

      payment = await this.prismaService.payment.update({
        where: { slug: paymentSlug },
        data: {
          installments: paymentMethodType === 'credit' ? installments : 1,
          method_id:
            paymentMethodType === 'credit'
              ? PaymentMethodEnum.CREDIT_CARD
              : PaymentMethodEnum.DEBIT_CARD,
          person_id: person.id,
          document: identificationNumber,
        },
        include: {
          payment_item: {
            include: {
              item: {
                include: {
                  payment_installment_item: true,
                },
              },
            },
          },
        },
      });

      const items = payment.payment_item.map((pi) => ({
        id: pi.item_id,
        title: pi.item.name,
        description: pi.item.name,
        quantity: pi.quantity,
        unit_price: pi.unit_price,
      }));

      const { firstName, lastName } = await this.getFirstAndLastName(name);

      const paymentCreditCard = await provider.createPaymentCreditCard({
        token,
        installments,
        transactionAmount: Number(payment.amount) - Number(payment.discount),
        description: '',
        paymentMethodId,
        paymentMethodType,
        issuerId,
        externalReference: payment.slug,
        items,
        firstName,
        lastName,
        payerEmail: email,
        payerIdentificationNumber: identificationNumber,
        payerIdentificationType: identificationType,
      });

      await this.saveCreditCard(payment.id, paymentCreditCard);

      return {
        payment: await this.getPaymentDetails(payment.id),
        created,
        code,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async paymentReset({ slug }: ResetDTO) {
    return this.prismaService.payment.update({
      where: { slug },
      data: { status_id: PaymentStatusEnum.PENDING },
    });
  }

  async saveCreditCard(paymentId: number, data: any) {
    const provider = await this.getProvider();

    if (this.setting['payment-provider'] === EnumProvider.MERCADO_PAGO) {
      const statusId = provider.getStatusId(data.status);

      await this.paymentService.update({
        id: paymentId,
        data: {
          brand_id: provider.getBrandId(data.payment_method_id),
          status_id: statusId,
          payment_at:
            statusId === PaymentStatusEnum.PAID
              ? new Date().toISOString()
              : null,
        },
      });

      const payment = await this.getPaymentDetails(paymentId);
      const email = await this.contactService.getPersonContact(
        payment.person_id,
        PersonContactTypeEnum.EMAIL,
      );

      const mailPaidSended = await this.prismaService.payment_value.count({
        where: {
          payment_id: paymentId,
          name: 'mail_paid',
          value: '1',
        },
      });

      if (
        mailPaidSended === 0 &&
        email &&
        statusId === PaymentStatusEnum.PAID
      ) {
        await this.setPaymentValue(paymentId, 'mail_paid', '1');
        await this.mailService.send({
          to: email.value,
          subject: 'Pagamento Aprovado',
          body: getPaymentEmail({
            message:
              'Seu pagamento foi aprovado com sucesso. Confira os detalhes abaixo:',
            title: 'Pagamento Aprovado',
            discount: Number(payment.discount),
            total: Number(payment.amount) - Number(payment.discount),
            method:
              payment.method_id === PaymentMethodEnum.CREDIT_CARD
                ? 'credit-card'
                : 'pix',
            items: payment.payment_item.map((pi) => ({
              quantity: pi.quantity,
              name: pi.item.name,
              price: Number(pi.unit_price) * pi.quantity,
              unitPrice: Number(pi.unit_price),
            })),
          }),
        });
      }

      await this.eventEmitterReadinessWatcher.waitUntilReady();

      await this.eventEmmitterPayment(statusId, paymentId);

      if (data?.card?.first_six_digits) {
        await this.setPaymentValue(
          paymentId,
          'first_six_digits',
          data.card.first_six_digits,
        );
      }

      if (data?.card?.last_four_digits) {
        await this.setPaymentValue(
          paymentId,
          'last_four_digits',
          data.card.last_four_digits,
        );
      }
    }
  }

  async eventEmmitterPayment(statusId: number, paymentId: number) {
    console.log('eventEmmitterPayment', { statusId, paymentId });
    switch (statusId) {
      case PaymentStatusEnum.PENDING:
        this.eventEmitter.emit('payment.pending', paymentId);
        break;
      case PaymentStatusEnum.PROCESSING:
        this.eventEmitter.emit('payment.processing', paymentId);
        break;
      case PaymentStatusEnum.PAID:
        this.eventEmitter.emit('payment.paid', paymentId);
        break;
      case PaymentStatusEnum.REJECTED:
        this.eventEmitter.emit('payment.rejected', paymentId);
        break;
      case PaymentStatusEnum.CANCELED:
        this.eventEmitter.emit('payment.canceled', paymentId);
        break;
      case PaymentStatusEnum.EXPIRED:
        this.eventEmitter.emit('payment.expired', paymentId);
        break;
      case PaymentStatusEnum.REFUNDED:
        this.eventEmitter.emit('payment.refunded', paymentId);
        break;
    }
  }

  async createSubscription(priceId: string, customerId: string): Promise<any> {
    //TO DO
  }

  async getNewSlug() {
    const slug = uuidv4();
    const exists = await this.prismaService.payment.count({ where: { slug } });
    return exists ? this.getNewSlug() : slug;
  }

  private async getPersonId(userId?: number): Promise<number | null> {
    if (!userId) return null;

    const person = await this.prismaService.person.findFirst({
      where: {
        person_user: {
          some: {
            user_id: userId,
          },
        },
      },
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
      where: { slug },
    });

    if (payment && !payment.person_id && personId) {
      await this.prismaService.payment.update({
        where: { id: payment.id },
        data: { person_id: personId },
      });
    }

    return payment;
  }

  async getPaymentDetails(paymentId: number): Promise<any> {
    return this.prismaService.payment.findUnique({
      where: { id: paymentId },
      include: {
        payment_item: {
          include: {
            item: {
              include: {
                payment_method_item: true,
                payment_installment_item: true,
              },
            },
          },
        },
        payment_method: true,
        payment_card_brand: true,
        payment_status: true,
        person: {
          include: {
            person_contact: {
              where: {
                type_id: {
                  in: [
                    PersonContactTypeEnum.EMAIL,
                    PersonContactTypeEnum.PHONE,
                  ],
                },
              },
            },
            person_document: {
              where: {
                type_id: {
                  in: [PersonDocumentTypeEnum.CPF, PersonDocumentTypeEnum.CNPJ],
                },
              },
            },
          },
        },
        payment_coupon: true,
        payment_value: true,
      },
    });
  }

  async removeCoupon(paymentId: number, couponId: number) {
    return this.paymentService.update({
      id: paymentId,
      data: { coupon_id: null, discount: 0 },
    });
  }

  async setCoupon(couponCode: string, paymentSlug: string) {
    const payment = await this.getPaymentWithItems(paymentSlug);
    const hasMethodDiscount = await this.hasMethodDiscount(payment.id);
    const discountCumulative =
      String(this.setting['payment-discount-cumulative']) === 'true';

    if (hasMethodDiscount && !discountCumulative) {
      throw new BadRequestException('Method discount not cumulative.');
    }

    if (!payment || payment.status_id !== PaymentStatusEnum.PENDING) {
      throw new BadRequestException('Payment not found or not pending.');
    }

    if (!couponCode) {
      await this.removeCoupon(payment.id, payment.coupon_id);

      return this.getPaymentDetails(payment.id);
    } else {
      const coupon = await this.getCouponWithItems(couponCode);

      if (
        coupon &&
        Number(coupon.uses_limit) > 0 &&
        (Number(coupon.uses_qtd) ?? 0) >= (Number(coupon.uses_limit) ?? 0)
      ) {
        throw new BadRequestException('Consumption coupon or usage limit.');
      }

      if (String(this.setting['payment-coupon-exact-items-quantity'] === 'true') && payment?.payment_item?.length > 0 && coupon?.payment_coupon_item?.length > 0) {

        const itemsFromCoupon = coupon.payment_coupon_item?.map((i) => i.item_id);
        const itemsFromPayment = payment.payment_item?.map((i) => i.item_id);

        if (Array.isArray(itemsFromCoupon) && Array.isArray(itemsFromPayment)) {

          const missingItems = itemsFromCoupon.filter((itemId) => !itemsFromPayment.includes(itemId));

          if (missingItems.length > 0) {

            throw new BadRequestException('Coupon is not valid.');

          }

        }

      }

      const itemsFromPaymentAndCoupon = this.getItemsFromPaymentAndCoupon(
        payment,
        coupon,
      );

      if (itemsFromPaymentAndCoupon?.length) {
        await this.applyCouponDiscount(
          payment.id,
          coupon,
          Number(payment.amount),
        );

        await this.verifyPixDiscount(payment.id);

        return this.getPaymentDetails(payment.id);
      } else {
        throw new BadRequestException('Coupon not is valid.');
      }
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
    return payment.payment_item?.filter((item) =>
      (coupon?.payment_coupon_item ?? [])
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
      case DiscountTypeEnum.DISCOUNT_FIXED_VALUE:
        return this.paymentService.update({
          id: paymentId,
          data: { coupon_id: coupon.id, discount: Number(coupon.value) },
        });

      case DiscountTypeEnum.PROMOTIONAL_PRICE:
        const valueToReducePromotionalPrice =
          Number(paymentAmount) - Number(coupon.value);

        return this.paymentService.update({
          id: paymentId,
          data: { coupon_id: coupon.id, discount: Number(valueToReducePromotionalPrice) },
        });

      case DiscountTypeEnum.DISCOUNT_PERCENTAGE_VALUE:
        const valueToReduce =
          (Number(paymentAmount) * Number(coupon.value)) / 100;

        return this.paymentService.update({
          id: paymentId,
          data: { coupon_id: coupon.id, discount: Number(valueToReduce) },
        });
    }
  }

  async notification(gatewayId: number, data: any) {
    console.log('notification', { gatewayId, type: data.type });
    try {
      if (
        gatewayId === PaymentGatewayEnum.MERCADO_PAGO &&
        data.type === 'payment'
      ) {
        const paymentData = await this.getProviderPayment(data.data.id);

        if (!paymentData.external_reference) {
          throw new Error('external_reference not found');
        }

        let payment = await this.prismaService.payment.findFirst({
          where: { slug: paymentData.external_reference },
          select: {
            id: true,
            coupon_id: true,
            status_id: true,
            person_id: true,
            discount: true,
            amount: true,
            method_id: true,
            payment_item: {
              include: {
                item: true,
              },
            },
          },
        });

        if (!payment) {
          throw new Error('payment not found');
        }

        console.log(payment);

        await this.prismaService.payment_notification.create({
          data: {
            log: JSON.stringify(data),
            gateway_id: gatewayId,
            payment_id: payment.id,
          },
        });

        await this.setPaymentValue(payment.id, 'mercado_pago_id', data.data.id);

        switch (paymentData.status) {
          case 'approved':
          case 'authorized':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: {
                status_id: PaymentStatusEnum.PAID,
                payment_at: new Date(),
              },
            });

            const email = await this.contactService.getPersonContact(
              payment.person_id,
              PersonContactTypeEnum.EMAIL,
            );

            if (payment.coupon_id) {
              const couponUsedCheck =
                await this.prismaService.payment_value.count({
                  where: {
                    payment_id: payment.id,
                    name: 'coupon_used',
                    value: '1',
                  },
                });

              if (!couponUsedCheck) {
                await this.setPaymentValue(payment.id, 'coupon_used', '1');

                await this.prismaService.payment_coupon.update({
                  where: { id: payment.coupon_id },
                  data: { uses_qtd: { increment: 1 } },
                });
              }
            }

            const mailPaidSended = await this.prismaService.payment_value.count(
              {
                where: {
                  payment_id: payment.id,
                  name: 'mail_paid',
                  value: '1',
                },
              },
            );

            if (
              mailPaidSended === 0 &&
              email &&
              payment.status_id === PaymentStatusEnum.PAID
            ) {
              await this.setPaymentValue(payment.id, 'mail_paid', '1');
              await this.mailService.send({
                to: email.value,
                subject: 'Pagamento Aprovado',
                body: getPaymentEmail({
                  message:
                    'Seu pagamento foi aprovado com sucesso. Confira os detalhes abaixo:',
                  title: 'Pagamento Aprovado',
                  discount: Number(payment.discount),
                  total: Number(payment.amount) - Number(payment.discount),
                  method:
                    payment.method_id === PaymentMethodEnum.CREDIT_CARD
                      ? 'credit-card'
                      : 'pix',
                  items: payment.payment_item.map((pi) => ({
                    quantity: pi.quantity,
                    name: pi.item.name,
                    price: Number(pi.unit_price) * pi.quantity,
                    unitPrice: Number(pi.unit_price),
                  })),
                }),
              });
            }
            break;
          case 'pending':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.PENDING },
            });
            break;
          case 'in_process':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.PROCESSING },
            });
            break;
          case 'in_mediation':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.PROCESSING },
            });
            break;
          case 'rejected':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.REJECTED },
            });
            await this.setPaymentValue(
              payment.id,
              'rejected',
              new Date().toISOString(),
            );
            break;
          case 'cancelled':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.CANCELED },
            });
            await this.setPaymentValue(
              payment.id,
              'cancelled',
              new Date().toISOString(),
            );
            break;
          case 'refunded':
          case 'charged_back':
            await this.prismaService.payment.update({
              where: { id: payment.id },
              data: { status_id: PaymentStatusEnum.REFUNDED },
            });
            await this.setPaymentValue(
              payment.id,
              'refunded',
              new Date().toISOString(),
            );
            break;
          default:
            console.log('status not detected in notification', paymentData);
            break;
        }

        payment = await this.prismaService.payment.findFirst({
          where: { id: payment.id },
          select: {
            id: true,
            coupon_id: true,
            status_id: true,
            person_id: true,
            discount: true,
            amount: true,
            method_id: true,
            payment_item: {
              include: {
                item: true,
              },
            },
          },
        });

        await this.eventEmmitterPayment(payment.status_id, payment.id);
      } else {
        await this.prismaService.payment_notification.create({
          data: {
            log: JSON.stringify({ data }),
            gateway_id: gatewayId,
          },
        });
      }

      return { success: true };
    } catch (error: any) {
      console.error('error', error);

      await this.prismaService.payment_notification.create({
        data: {
          log: JSON.stringify({ error: error?.message ?? String(error), data }),
          gateway_id: gatewayId,
        },
      });

      return { success: false, error: error?.message ?? String(error) };
    }
  }

  async hasAccount(paymentId: number) {
    let hasAccount = false;

    const user = await this.prismaService.user.findFirst({
      where: {
        person_user: {
          some: {
            person: {
              payment: {
                some: {
                  id: paymentId,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        password: true,
        code: true,
      },
    });

    if (user && user?.password) {
      hasAccount = true;
    }

    return { hasAccount, code: user?.code ?? null };
  }
}
