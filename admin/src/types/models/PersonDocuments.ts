import { Persons } from './Persons';
import { PersonDocumentTypes } from './PersonDocumentTypes';
import { Countries } from './Countries';

export type PersonDocuments = {
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
  persons?: Persons;
  person_document_types?: PersonDocumentTypes;
  countries?: Countries;
}