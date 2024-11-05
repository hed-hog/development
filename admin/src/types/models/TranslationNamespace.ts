import { Translation } from './Translation';

export type TranslationNamespace = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  translation?: Translation[];
}