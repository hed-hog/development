import { Faq } from './Faq';
import { Locale } from './Locale';

export type FaqLocale = {
  faq_id?: number;
  locale_id?: number;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
  faq?: Faq;
  locale?: Locale;
}