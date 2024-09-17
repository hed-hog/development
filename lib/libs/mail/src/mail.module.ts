import { HttpModule } from '@nestjs/axios';
import { DynamicModule, forwardRef, Module, Provider } from '@nestjs/common';
import {
  MailModuleAsyncOptions,
  MailModuleOptions,
  MailOptionsFactory,
} from './interfaces/mail-module-options.interface';
import { MAIL_MODULE_OPTIONS } from './mail.consts';
import { MailService } from './mail.service';

@Module({
  imports: [forwardRef(() => HttpModule)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  static register(options: MailModuleOptions): DynamicModule {
    console.log('MailModule.register', { options });
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

  static registerAsync(options: MailModuleAsyncOptions): DynamicModule {
    return {
      module: MailModule,
      global: options.global,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        ...(options.extraProviders ?? []),
      ],
    };
  }

  private static createAsyncProviders(
    options: MailModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: MailModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAIL_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MAIL_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MailOptionsFactory) =>
        await optionsFactory.createMailOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
