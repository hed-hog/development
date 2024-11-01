import { PersonDocument } from './PersonDocument';
import { CountryLocale } from './CountryLocale';
import { PersonDocumentType } from './PersonDocumentType';
import { PersonAddress } from './PersonAddress';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_document?: PersonDocument[];
  country_locale?: CountryLocale[];
  person_document_type?: PersonDocumentType[];
  person_address?: PersonAddress[];
  name?: string;
}