import { PersonAddressTypes } from './PersonAddressTypes';
import { Locales } from './Locales';

export type PersonAddressTypeTranslations = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_address_types?: PersonAddressTypes;
  locales?: Locales;
}