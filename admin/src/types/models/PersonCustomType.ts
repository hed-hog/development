import { PersonCustom } from './PersonCustom';
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';

export type PersonCustomType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_custom?: PersonCustom[];
  person_custom_type_locale?: PersonCustomTypeLocale[];
  name?: string;
}