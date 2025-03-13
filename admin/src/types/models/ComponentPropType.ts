import { ComponentProp } from './ComponentProp';
import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';

export type ComponentPropType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  component_prop?: ComponentProp[];
  component_prop_type_locale?: ComponentPropTypeLocale[];
  name?: string;
}