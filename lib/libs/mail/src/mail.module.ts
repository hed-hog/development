import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailModuleOptions } from './interfaces/mail-module-options.interface';
import { MailConfigurationTypeEnum } from './enums/mail-configuration-type.enum';
import { MAIL_MODULE_OPTIONS } from './mail.consts';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  static init(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      global: options.global,
      providers: [
        {
          provide: MAIL_MODULE_OPTIONS,
          useValue: options || {},
        },
      ],
    };
  }
}
