import { Component } from './Component';
import { ComponentTypeLocale } from './ComponentTypeLocale';

export type ComponentType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  component?: Component[];
  component_type_locale?: ComponentTypeLocale[];
  name?: string;
}