import { PersonDocument } from './PersonDocument';
import { PersonDocumentType } from './PersonDocumentType';
import { CountryLocale } from './CountryLocale';
import { PersonAddress } from './PersonAddress';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_document?: PersonDocument[];
  person_document_type?: PersonDocumentType[];
  country_locale?: CountryLocale[];
  person_address?: PersonAddress[];
  name?: string;
}