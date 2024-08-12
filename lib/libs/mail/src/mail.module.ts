import { DynamicModule, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailModuleOptions } from './interfaces/mail-module-options.interface';
import { MailConfigurationTypeEnum } from './enums/mail-configuration-type.enum';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {

  private static configureAws(options: MailModuleOptions) { }

  private static configureSMTP(options: MailModuleOptions) { }

  static init(options: MailModuleOptions): DynamicModule {

    console.log({
      options
    })

    switch (options.mailConfigurationType) {

      case MailConfigurationTypeEnum.AWS:
        this.configureAws(options);
        break;

      case MailConfigurationTypeEnum.SMTP:
        this.configureSMTP(options);
        break;

    }

    return {
      module: MailModule,
      global: options.global,
    };

  }

}
