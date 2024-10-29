import { Multifactors } from './Multifactors';
import { Locales } from './Locales';

export type MultifactorTranslations = {
  multifactor_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  multifactors?: Multifactors;
  locales?: Locales;
}