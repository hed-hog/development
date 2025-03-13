import { InstanceVisibilityEnum } from './InstanceVisibilityEnum';
import { Component } from './Component';
import { InstanceProp } from './InstanceProp';

export type Instance = {
  id?: number;
  component_id: number;
  name: string;
  parent_id: number;
  order?: number;
  visibility?: InstanceVisibilityEnum;
  created_at?: string;
  updated_at?: string;
  component?: Component;
  instance?: Instance;
  instance_prop?: InstanceProp[];
  other_instance?: Instance[];
}