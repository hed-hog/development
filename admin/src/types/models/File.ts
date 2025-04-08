import { FileProvider } from './FileProvider';
import { FileMimetype } from './FileMimetype';
import { Person } from './Person';

export type File = {
  id?: number;
  filename: string;
  path: string;
  provider_id: number;
  location: string;
  mimetype_id: number;
  size?: number;
  created_at?: string;
  updated_at?: string;
  file_provider?: FileProvider;
  file_mimetype?: FileMimetype;
  person?: Person[];
}