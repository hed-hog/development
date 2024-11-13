import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';
import { PersonAddress } from './PersonAddress';

export type PersonAddressType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_address_type_locale?: PersonAddressTypeLocale[];
  person_address?: PersonAddress[];
  name?: string;
}