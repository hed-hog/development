import { Persons } from './Persons';
import { Countries } from './Countries';
import { PersonAddressTypes } from './PersonAddressTypes';

export type PersonAddresses = {
  id?: number;
  person_id: number;
  country_id: number;
  type_id: number;
  primary?: boolean;
  street: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  postal_code: string;
  reference?: string;
  created_at?: string;
  updated_at?: string;
  persons?: Persons;
  countries?: Countries;
  person_address_types?: PersonAddressTypes;
}