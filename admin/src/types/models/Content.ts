import { ContentLocale } from './ContentLocale';

export type Content = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  content_locale?: ContentLocale[];
  title?: string;
  body?: string;
}