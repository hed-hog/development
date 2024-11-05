import { Person } from './Person';
import { PersonDocumentType } from './PersonDocumentType';
import { Country } from './Country';

export type PersonDocument = {
  id?: number;
  person_id: number;
  type_id: number;
  country_id: number;
  primary?: boolean;
  value: string;
  issued_at?: string;
  expiry_at?: string;
  created_at?: string;
  updated_at?: string;
  person?: Person;
  person_document_type?: PersonDocumentType;
  country?: Country;
}