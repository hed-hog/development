import { ModuleMetadata } from '@nestjs/common';

export type RabbitModuleOptions = {
  global?: boolean;
  url: string;
  debug?: boolean;
};

export interface RabbitModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<RabbitModuleOptions> | RabbitModuleOptions;
  inject?: any[];
}
