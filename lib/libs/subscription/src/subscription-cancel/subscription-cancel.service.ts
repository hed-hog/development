import { LocaleService } from '@hedhog/locale';
import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

@Injectable()
export class SubscriptionCancelService {
  private readonly modelName = 'subscription_cancel_reason';
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  async listReasons(locale: string, paginationParams: PaginationDTO) {
    return this.localeService.listModelWithLocale(
      locale,
      this.modelName,
      paginationParams,
    );
  }

  async addSubscriptionCancel(
    subscriptionId: number,
    reasonIds: number[],
    personId: number,
    comment: string,
  ) {
    const { id } = await this.prismaService.subscription_cancel.create({
      data: {
        subscription_id: subscriptionId,
        person_id: personId,
        comment,
      },
    });

    await Promise.all(
      reasonIds.map((reasonId) =>
        this.prismaService.subscription_cancel_reason_choose.create({
          data: {
            cancel_id: id,
            reason_id: reasonId,
          },
        }),
      ),
    );

    await this.prismaService.subscription.update({
      where: {
        id: subscriptionId,
      },
      data: {
        status: 'canceled',
      },
    });

    return id;
  }
}
