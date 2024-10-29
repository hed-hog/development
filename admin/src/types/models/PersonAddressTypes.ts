import { PersonAddresses } from './PersonAddresses';
import { PersonAddressTypeTranslations } from './PersonAddressTypeTranslations';

export type PersonAddressTypes = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_addresses?: PersonAddresses[];
  person_address_type_translations?: PersonAddressTypeTranslations[];
}