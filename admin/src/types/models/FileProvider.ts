import { File } from './File';
import { FileProviderLocale } from './FileProviderLocale';

export type FileProvider = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  file?: File[];
  file_provider_locale?: FileProviderLocale[];
  name?: string;
}