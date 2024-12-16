import { File } from './File';

export type FileMimetype = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  file?: File[];
}