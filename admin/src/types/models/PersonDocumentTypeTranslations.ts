import { PersonDocumentTypes } from './PersonDocumentTypes';
import { Locales } from './Locales';

export type PersonDocumentTypeTranslations = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_document_types?: PersonDocumentTypes;
  locales?: Locales;
}