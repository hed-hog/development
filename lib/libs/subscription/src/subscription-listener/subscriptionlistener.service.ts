import { ContactService, PersonContactTypeEnum } from '@hedhog/contact';
import { MailService } from '@hedhog/mail';
import { CheckoutService, PaymentStatusEnum } from '@hedhog/payment';
import { PrismaService } from '@hedhog/prisma';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { addMonths, addYears } from 'date-fns';
import {
  getSubscriptionCanceledEmail,
  getSubscriptionCreatedEmail,
} from '../emails';

@Injectable()
export class SubscriptionListenerService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => CheckoutService))
    private readonly checkoutService: CheckoutService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
  ) {}

  @OnEvent('payment.paid')
  async handlePaymentPaidEvent(paymentId: number) {
    const payment = await this.getPaymentForProcessing(paymentId);

    if (payment) {
      let subscriptions = await this.processPaymentItems(payment);

      if (subscriptions.length === payment.payment_item.length) {
        await this.markPaymentAsDelivered(paymentId);
      }

      subscriptions = await this.getSubscriptionsByPaymentId(paymentId);

      const email = await this.contactService.getPersonContact(
        payment.person_id,
        PersonContactTypeEnum.EMAIL,
      );

      if (email) {
        for (const subscription of subscriptions) {
          await this.mailService.send({
            to: email.value,
            subject: 'Assinatura Criada',
            body: getSubscriptionCreatedEmail({
              linkMySubscriptions: `${String(process.env.APP_URL)}/my-account?tab=subscriptions`,
              planName:
                subscription?.subscription_plan?.subscription_plan_locale.find(
                  (spl) => spl.locale_id === 2,
                )?.name,
            }),
          });
        }
      }
    }
  }

  @OnEvent('payment.refunded')
  async handlePaymentRefoundedEvent(paymentId: number) {
    const payment = await this.getPaymentActive(paymentId);

    if (payment) {
      await this.finishSubscriptions(paymentId);
    }
  }

  @OnEvent('payment.canceled')
  async handlePaymentCanceledEvent(paymentId: number) {
    console.log('handlePaymentCanceledEvent', { paymentId });

    const payment = await this.getPaymentActive(paymentId);

    if (payment) {
      const subscriptions = await this.finishSubscriptions(paymentId);

      const email = await this.contactService.getPersonContact(
        payment.person_id,
        PersonContactTypeEnum.EMAIL,
      );

      if (email) {
        for (const subscription of subscriptions) {
          await this.mailService.send({
            to: email.value,
            subject: 'Assinatura Cancelada',
            body: getSubscriptionCanceledEmail({
              linkMySubscriptions: `${String(process.env.APP_URL)}/my-account?tab=subscriptions`,
              planName:
                subscription?.subscription_plan?.subscription_plan_locale.find(
                  (spl) => spl.locale_id === 2,
                )?.name,
            }),
          });
        }
      }
    }
  }

  async finishSubscriptions(paymentId: number) {
    const subscriptions = await this.getSubscriptionsByPaymentId(paymentId);

    for (const subscription of subscriptions) {
      await this.prismaService.subscription_payment.updateMany({
        where: {
          subscription_id: subscription.id,
          payment_id: paymentId,
        },
        data: {
          end_at: new Date(),
        },
      });
    }

    return subscriptions;
  }

  async getSubscription(planId: number, personId: number) {
    let subscription = await this.prismaService.subscription.findFirst({
      where: {
        plan_id: planId,
        subscription_person: {
          some: {
            person_id: personId,
            role: 'admin',
          },
        },
      },
      include: {
        subscription_plan: true,
      },
    });

    if (!subscription) {
      const plan = await this.prismaService.subscription_plan.findUnique({
        where: {
          id: planId,
        },
      });

      if (!plan) {
        throw new NotFoundException(`Plan ${planId} not found`);
      }

      subscription = await this.prismaService.subscription.create({
        data: {
          status: 'active',
          plan_id: plan.id,
          limit: plan.limit,
          subscription_person: {
            create: {
              person_id: personId,
              role: 'admin',
            },
          },
        },
        include: {
          subscription_plan: true,
        },
      });
    } else {
      subscription = await this.prismaService.subscription.update({
        where: {
          id: subscription.id,
        },
        data: {
          status: 'active',
        },
        include: {
          subscription_plan: true,
        },
      });
    }

    return subscription;
  }

  private async getPaymentActive(paymentId: number) {
    return this.prismaService.payment.findFirst({
      where: {
        id: paymentId,
        delivered: 1,
        status_id: PaymentStatusEnum.PAID,
        payment_at: {
          not: null,
        },
        person_id: {
          not: null,
        },
      },
      include: {
        payment_item: {
          include: {
            item: {
              include: {
                subscription_plan: true,
              },
            },
          },
        },
      },
    });
  }

  private async getPaymentForProcessing(paymentId: number) {
    return this.prismaService.payment.findFirst({
      where: {
        id: paymentId,
        delivered: 0,
        status_id: PaymentStatusEnum.PAID,
        payment_at: {
          not: null,
        },
        person_id: {
          not: null,
        },
      },
      include: {
        payment_item: {
          include: {
            item: {
              include: {
                subscription_plan: true,
              },
            },
          },
        },
      },
    });
  }

  private async processPaymentItems(payment: any) {
    const subscriptions = [];
    const payment_items = (payment.payment_item || []).filter(
      (pi) => pi?.item?.subscription_plan,
    );

    for (const payment_item of payment_items) {
      const { item } = payment_item;
      const subscription_plan = (item.subscription_plan || []).pop();

      if (!item || !subscription_plan) {
        continue;
      }

      const subscription = await this.getSubscription(
        subscription_plan.id,
        payment.person_id,
      );

      const startAt = new Date(payment.payment_at);

      startAt.setHours(0, 0, 0, 0);

      const endAt = this.calculateEndAt(
        subscription.subscription_plan.duration,
        payment.payment_at,
      );

      endAt.setHours(23, 59, 59, 999);

      await this.prismaService.subscription_payment.create({
        data: {
          payment_id: payment.id,
          subscription_id: subscription.id,
          start_at: startAt,
          end_at: endAt,
        },
      });

      subscriptions.push(subscription);
    }

    return subscriptions;
  }

  private calculateEndAt(duration: string, startAt: Date) {
    let endAt = new Date(startAt);

    switch (duration) {
      case 'monthly':
        endAt = addMonths(endAt, 1);
        break;
      case 'yearly':
        endAt = addYears(endAt, 1);
        break;
      case 'quarterly':
        endAt = addMonths(endAt, 3);
        break;
      case 'semianually':
        endAt = addMonths(endAt, 6);
        break;
    }

    return endAt;
  }

  private async markPaymentAsDelivered(paymentId: number) {
    await this.prismaService.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        delivered: 1,
      },
    });
    await this.checkoutService.setPaymentValue(
      paymentId,
      'delivered_at',
      new Date().toISOString(),
    );
  }

  async getSubscriptionsByPaymentId(paymentId: number) {
    return this.prismaService.subscription.findMany({
      where: {
        subscription_payment: {
          some: {
            payment_id: paymentId,
          },
        },
      },
      include: {
        subscription_plan: {
          include: {
            subscription_plan_locale: true,
          },
        },
        subscription_person: true,
      },
    });
  }
}
