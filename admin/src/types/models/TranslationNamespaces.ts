import { Translations } from './Translations';

export type TranslationNamespaces = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  translations?: Translations[];
}