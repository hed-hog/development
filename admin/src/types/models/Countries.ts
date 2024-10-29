import { PersonDocumentTypes } from './PersonDocumentTypes';
import { PersonDocuments } from './PersonDocuments';
import { CountryTranslations } from './CountryTranslations';
import { PersonAddresses } from './PersonAddresses';

export type Countries = {
  id?: number;
  code: string;
  created_at?: string;
  updated_at?: string;
  person_document_types?: PersonDocumentTypes[];
  person_documents?: PersonDocuments[];
  country_translations?: CountryTranslations[];
  person_addresses?: PersonAddresses[];
}