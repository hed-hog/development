import { PersonDocumentType } from './PersonDocumentType';
import { CountryLocale } from './CountryLocale';
import { PersonDocument } from './PersonDocument';
import { PersonAddress } from './PersonAddress';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_document_type?: PersonDocumentType[];
  country_locale?: CountryLocale[];
  person_document?: PersonDocument[];
  person_address?: PersonAddress[];
  name?: string;
}