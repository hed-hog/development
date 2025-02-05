import { FaqLocale } from './FaqLocale';

export type Faq = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  faq_locale?: FaqLocale[];
  question?: string;
  answer?: string;
}