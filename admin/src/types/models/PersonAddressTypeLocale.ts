import { PersonAddressType } from './PersonAddressType';
import { Locale } from './Locale';

export type PersonAddressTypeLocale = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_address_type?: PersonAddressType;
  locale?: Locale;
}