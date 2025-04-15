import { ComponentType } from './ComponentType';
import { ComponentProp } from './ComponentProp';
import { Instance } from './Instance';

export type Component = {
  id?: number;
  type_id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  component_type?: ComponentType;
  component_prop?: ComponentProp[];
  instance?: Instance[];
}