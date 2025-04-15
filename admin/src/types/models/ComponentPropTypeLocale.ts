import { ComponentPropType } from './ComponentPropType';
import { Locale } from './Locale';

export type ComponentPropTypeLocale = {
  id?: number;
  type_id: number;
  locale_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  component_prop_type?: ComponentPropType;
  locale?: Locale;
}