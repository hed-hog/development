import { PersonDocument } from './PersonDocument';
import { CountryLocale } from './CountryLocale';
import { PersonAddress } from './PersonAddress';
import { PersonDocumentType } from './PersonDocumentType';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_document?: PersonDocument[];
  country_locale?: CountryLocale[];
  person_address?: PersonAddress[];
  person_document_type?: PersonDocumentType[];
  name?: string;
}