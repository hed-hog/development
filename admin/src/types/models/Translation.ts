import { Locale } from './Locale';
import { TranslationNamespace } from './TranslationNamespace';

export type Translation = {
  id?: number;
  locale_id: number;
  namespace_id: number;
  name: string;
  value: string;
  created_at?: string;
  updated_at?: string;
  locale?: Locale;
  translation_namespace?: TranslationNamespace;
}