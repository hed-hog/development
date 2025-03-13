import { ComponentPropTypeLocale } from './ComponentPropTypeLocale';
import { ComponentProp } from './ComponentProp';

export type ComponentPropType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  component_prop_type_locale?: ComponentPropTypeLocale[];
  component_prop?: ComponentProp[];
  name?: string;
}