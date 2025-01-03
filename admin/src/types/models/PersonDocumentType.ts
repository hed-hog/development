import { Country } from './Country';
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale';

export type PersonDocumentType = {
  id?: number;
  country_id: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  country?: Country;
  person_document_type_locale?: PersonDocumentTypeLocale[];
  name?: string;
}