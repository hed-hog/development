import { FileProviders } from './FileProviders';
import { FileMimetypes } from './FileMimetypes';
import { Persons } from './Persons';

export type Files = {
  id?: number;
  filename: string;
  path: string;
  provider_id: number;
  location: string;
  mimetype_id: number;
  size?: number;
  created_at?: string;
  updated_at?: string;
  file_providers?: FileProviders;
  file_mimetypes?: FileMimetypes;
  persons?: Persons[];
  persons_persons_cover_idTofiles?: Persons[];
}