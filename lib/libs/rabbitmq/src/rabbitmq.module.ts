import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  RabbitModuleAsyncOptions,
  RabbitModuleOptions,
} from './rabbitmq-module.type';
import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.consts';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({})
export class RabbitmqModule {
  static forRoot(options: RabbitModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [],
      providers: [
        RabbitMQService,
        {
          provide: RABBITMQ_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [RabbitMQService],
    };
  }

  static forRootAsync(options: RabbitModuleAsyncOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [...(options.imports || [])],
      providers: [RabbitMQService, this.createAsyncOptionsProvider(options)],
      exports: [RabbitMQService],
    };
  }

  private static createAsyncOptionsProvider(
    options: RabbitModuleAsyncOptions,
  ): Provider {
    return {
      provide: RABBITMQ_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
