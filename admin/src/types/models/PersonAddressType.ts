import { PersonAddress } from './PersonAddress';
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale';

export type PersonAddressType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_address?: PersonAddress[];
  person_address_type_locale?: PersonAddressTypeLocale[];
  name?: string;
}