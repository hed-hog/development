import { Files } from './Files';
import { FileProviderTranslations } from './FileProviderTranslations';

export type FileProviders = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  files?: Files[];
  file_provider_translations?: FileProviderTranslations[];
  name?: string;
}