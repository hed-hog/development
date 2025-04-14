import { DeleteDTO } from '@hedhog/core';
import { LocaleService } from '@hedhog/locale';
import { MailService as MailMainService } from '@hedhog/mail';
import { PaginationDTO } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { SendTemplatedMailDTO } from './dto/send.dto';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class MailService {
  private readonly modelName = 'mail';
  private readonly foreignKey = 'mail_id';

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => MailMainService))
    private readonly mailMainService: MailMainService,
    @Inject(forwardRef(() => LocaleService))
    private readonly localeService: LocaleService,
  ) {}

  async list(locale: string, paginationParams: PaginationDTO) {
    return this.localeService.listModelWithLocale(
      locale,
      this.modelName,
      paginationParams,
    );
  }

  async get(id: number) {
    return this.localeService.getModelWithLocale(this.modelName, id);
  }

  async create(data: CreateDTO) {
    return this.localeService.createModelWithLocale(
      this.modelName,
      this.foreignKey,
      data,
    );
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.localeService.updateModelWithLocale(
      this.modelName,
      this.foreignKey,
      id,
      data,
    );
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.',
      );
    }

    return this.prismaService.mail.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async sendTemplatedMail(
    locale: string,
    { email, slug, variables }: SendTemplatedMailDTO,
  ) {
    const localeRecord = await this.prismaService.locale.findUnique({
      where: { code: locale },
    });

    if (!localeRecord) {
      throw new Error(`Locale "${locale}" not found`);
    }

    const locale_id = localeRecord.id;

    const mail = await this.prismaService.mail.findUnique({
      where: { slug },
      include: {
        mail_locale: {
          where: { locale_id },
          select: { subject: true, body: true },
        },
        mail_var: {
          select: { name: true },
        },
      },
    });

    if (!mail) {
      throw new Error(`Template "${slug}" not found for locale "${locale}"`);
    }

    const { subject, body } = mail.mail_locale[0];

    const parsedSubject = this.interpolate(subject, variables);
    const parsedBody = this.interpolate(body, variables);

    await this.mailMainService.send({
      to: email,
      subject: parsedSubject,
      body: parsedBody,
    });

    console.log({ locale, mail, parsedSubject, parsedBody });
  }

  private interpolate(
    template: string,
    variables: Record<string, string>,
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? '');
  }
}
