import { ModuleMetadata } from '@nestjs/common';

export type MailModuleOptions =
  | {
      global?: boolean;
      debug?: boolean;
      type: 'AWS';
      region: string;
      accessKeyId: string;
      secretAccessKey: string;
      from: string;
    }
  | {
      global?: boolean;
      debug?: boolean;
      type: 'SMTP';
      host: string;
      port: number;
      secure?: boolean;
      username: string;
      password: string;
      rejectUnauthorized?: boolean;
    }
  | {
      global?: boolean;
      debug?: boolean;
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
