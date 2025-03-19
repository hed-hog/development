import { ComponentPropType } from './ComponentPropType';
import { Component } from './Component';
import { InstanceProp } from './InstanceProp';

export type ComponentProp = {
  id?: number;
  type_id: number;
  component_id: number;
  name: string;
  default: string;
  created_at?: string;
  updated_at?: string;
  component_prop_type?: ComponentPropType;
  component?: Component;
  instance_prop?: InstanceProp[];
}