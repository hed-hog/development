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
import { MailSentService } from '../mail-sent/mail-sent.service';
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
    @Inject(forwardRef(() => MailSentService))
    private readonly mailSentService: MailSentService,
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
    const localeRecord = await this.getLocaleRecord(locale);
    const mail = await this.getMailTemplate(slug, localeRecord.id);

    const { subject, body } = mail.mail_locale[0];
    const parsedSubject = this.interpolateTemplate(subject, variables);
    const parsedBody = this.interpolateTemplate(body, variables);

    const { mail: mailSent } = await this.mailMainService.send({
      to: email,
      subject: parsedSubject,
      body: parsedBody,
    });

    return this.mailSentService.create({
      body: parsedBody,
      subject: parsedSubject,
      to: email,
      from: mailSent.from,
      cc: mailSent.cc as string,
      bcc: mailSent.bcc as string,
      mail_id: mail.id,
    });
  }

  private async getLocaleRecord(locale: string) {
    const localeRecord = await this.prismaService.locale.findUnique({
      where: { code: locale },
    });

    if (!localeRecord) {
      throw new Error(`Locale "${locale}" not found`);
    }

    return localeRecord;
  }

  private async getMailTemplate(slug: string, localeId: number) {
    const mail = await this.prismaService.mail.findUnique({
      where: { slug },
      include: {
        mail_locale: {
          where: { locale_id: localeId },
          select: { subject: true, body: true },
        },
        mail_var: {
          select: { name: true },
        },
      },
    });

    if (!mail) {
      throw new Error(`Template "${slug}" not found for locale "${localeId}"`);
    }

    return mail;
  }

  private interpolateTemplate(
    template: string,
    variables: Record<string, string>,
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? '');
  }
}
