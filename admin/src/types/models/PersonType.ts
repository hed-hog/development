import { PersonTypeLocale } from './PersonTypeLocale';
import { Person } from './Person';

export type PersonType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_type_locale?: PersonTypeLocale[];
  person?: Person[];
  name?: string;
}