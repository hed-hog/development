import { CountryLocale } from './CountryLocale';
import { PersonAddress } from './PersonAddress';
import { PersonDocumentType } from './PersonDocumentType';
import { PersonDocument } from './PersonDocument';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  person_address?: PersonAddress[];
  person_document_type?: PersonDocumentType[];
  person_document?: PersonDocument[];
  name?: string;
}