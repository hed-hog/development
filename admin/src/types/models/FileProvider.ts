<<<<<<< HEAD
import { FileProviderLocale } from './FileProviderLocale';
import { File } from './File';
=======
import { File } from './File';
import { FileProviderLocale } from './FileProviderLocale';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type FileProvider = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  file_provider_locale?: FileProviderLocale[];
  file?: File[];
=======
  file?: File[];
  file_provider_locale?: FileProviderLocale[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
  name?: string;
}