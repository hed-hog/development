import { CountryLocale } from './CountryLocale';
import { PersonDocument } from './PersonDocument';
import { PersonAddress } from './PersonAddress';
import { PersonDocumentType } from './PersonDocumentType';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  person_document?: PersonDocument[];
  person_address?: PersonAddress[];
  person_document_type?: PersonDocumentType[];
  name?: string;
}