import { Files } from './Files';

export type FileMimetypes = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  files?: Files[];
}