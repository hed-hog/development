import { CountryLocale } from './CountryLocale';
import { PersonDocumentType } from './PersonDocumentType';

export type Country = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  country_locale?: CountryLocale[];
  person_document_type?: PersonDocumentType[];
  name?: string;
}