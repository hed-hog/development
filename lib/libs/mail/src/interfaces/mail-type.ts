export interface MailType {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject?: string;
  body?: string;
  replyTo?: string | string[];
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
}
