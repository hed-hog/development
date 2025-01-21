import { Person } from './Person';
import { Country } from './Country';
import { PersonAddressType } from './PersonAddressType';

export type PersonAddress = {
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
  person?: Person;
  country?: Country;
  person_address_type?: PersonAddressType;
}