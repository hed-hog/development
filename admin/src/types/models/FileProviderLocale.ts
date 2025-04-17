import { FileProvider } from './FileProvider';
import { Locale } from './Locale';

export type FileProviderLocale = {
  provider_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  file_provider?: FileProvider;
  locale?: Locale;
}