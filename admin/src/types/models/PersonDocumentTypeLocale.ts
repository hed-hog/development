import { PersonDocumentType } from './PersonDocumentType';
import { Locale } from './Locale';

export type PersonDocumentTypeLocale = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_document_type?: PersonDocumentType;
  locale?: Locale;
}