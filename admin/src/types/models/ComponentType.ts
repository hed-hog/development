import { ComponentTypeLocale } from './ComponentTypeLocale';
import { Component } from './Component';

export type ComponentType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  component_type_locale?: ComponentTypeLocale[];
  component?: Component[];
  name?: string;
}