import { PersonAddress } from './PersonAddress';
import { PersonDocumentType } from './PersonDocumentType';
import { CountryLocale } from './CountryLocale';
import { PersonDocument } from './PersonDocument';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_address?: PersonAddress[];
  person_document_type?: PersonDocumentType[];
  country_locale?: CountryLocale[];
  person_document?: PersonDocument[];
  name?: string;
}