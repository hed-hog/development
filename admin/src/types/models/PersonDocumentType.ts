import { Country } from './Country';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';
import { PersonDocument } from './PersonDocument';

export type PersonDocumentType = {
  id?: number;
  country_id: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  country?: Country;
  person_document_type_locale?: PersonDocumentTypeLocale[];
  person_document?: PersonDocument[];
  name?: string;
}