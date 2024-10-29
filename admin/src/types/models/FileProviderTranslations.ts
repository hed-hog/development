import { FileProviders } from './FileProviders';
import { Locales } from './Locales';

export type FileProviderTranslations = {
  provider_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  file_providers?: FileProviders;
  locales?: Locales;
}