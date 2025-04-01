import { ComponentProp } from './ComponentProp';
import { Instance } from './Instance';

export type InstanceProp = {
  id?: number;
  prop_id: number;
  instance_id: number;
  value: string;
  created_at?: string;
  updated_at?: string;
  component_prop?: ComponentProp;
  instance?: Instance;
}