import { MailType } from './interfaces/mail-type';

export type MailAttachment = {
  filename?: string;
  content?: Buffer;
  contentType?: string;
};

export type Mail = {
  attachments?: MailAttachment[];
} & MailType;

export type MailConfig = {
  host?: string;
  from?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

export const MAIL_MODULE_OPTIONS = 'MAIL_MODULE_OPTIONS';
