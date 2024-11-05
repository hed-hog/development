import { Multifactor } from './Multifactor';
import { Locale } from './Locale';

export type MultifactorLocale = {
  multifactor_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  multifactor?: Multifactor;
  locale?: Locale;
}