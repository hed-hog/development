import { TagLocale } from './TagLocale';

export type Tag = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  tag_locale?: TagLocale[];
  name?: string;
}