import { ModuleMetadata } from '@nestjs/common';

export type MailModuleOptions =
  | {
      global?: boolean;
      type: 'AWS';
      region: string;
      accessKeyId: string;
      secretAccessKey: string;
      from: string;
    }
  | {
      global?: boolean;
      type: 'SMTP';
      host: string;
      port: number;
      secure?: boolean;
      username: string;
      password: string;
    }
  | {
      global?: boolean;
      type: 'GMAIL';
      clientId: string;
      clientSecret: string;
      refreshToken: string;
      from: string;
    };

export interface MailOptionsFactory {
  createMailOptions(): Promise<MailModuleOptions> | MailModuleOptions;
}

export interface MailModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<MailModuleOptions> | MailModuleOptions;
  inject?: any[];
}
