import { MenuLocale } from './MenuLocale';
import { MenuScreen } from './MenuScreen';
import { RoleMenu } from './RoleMenu';

export type Menu = {
  id?: number;
  menu_id?: number;
  slug: string;
  url?: string;
  order?: number;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menu?: Menu;
  menu_locale?: MenuLocale[];
  menu_screen?: MenuScreen[];
  other_menu?: Menu[];
  role_menu?: RoleMenu[];
  name?: string;
}