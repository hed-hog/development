import { PersonCustomTypeLocale } from './PersonCustomTypeLocale';
import { PersonCustom } from './PersonCustom';

export type PersonCustomType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_custom_type_locale?: PersonCustomTypeLocale[];
  person_custom?: PersonCustom[];
  name?: string;
}