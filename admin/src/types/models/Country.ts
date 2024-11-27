import { CountryLocale } from './CountryLocale';
import { PersonDocument } from './PersonDocument';
import { PersonDocumentType } from './PersonDocumentType';
import { PersonAddress } from './PersonAddress';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  person_document?: PersonDocument[];
  person_document_type?: PersonDocumentType[];
  person_address?: PersonAddress[];
  name?: string;
}