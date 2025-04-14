import { ComponentType } from './ComponentType';
import { Locale } from './Locale';

export type ComponentTypeLocale = {
  id?: number;
  type_id: number;
  locale_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  component_type?: ComponentType;
  locale?: Locale;
}