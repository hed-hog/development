import { ComponentType } from './ComponentType';
import { Instance } from './Instance';
import { ComponentProp } from './ComponentProp';

export type Component = {
  id?: number;
  type_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  component_type?: ComponentType;
  instance?: Instance[];
  component_prop?: ComponentProp[];
}