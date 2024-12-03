import { FileProviderLocale } from './FileProviderLocale';
import { File } from './File';

export type FileProvider = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  file_provider_locale?: FileProviderLocale[];
  file?: File[];
  name?: string;
}