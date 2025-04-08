import { PersonCustomType } from './PersonCustomType';
import { Locale } from './Locale';

export type PersonCustomTypeLocale = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_custom_type?: PersonCustomType;
  locale?: Locale;
}