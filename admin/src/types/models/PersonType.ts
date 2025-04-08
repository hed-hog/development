import { Person } from './Person';
import { PersonTypeLocale } from './PersonTypeLocale';

export type PersonType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person?: Person[];
  person_type_locale?: PersonTypeLocale[];
  name?: string;
}