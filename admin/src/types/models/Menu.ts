import { MenuLocale } from './MenuLocale';
import { RoleMenu } from './RoleMenu';
import { MenuScreen } from './MenuScreen';

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
  role_menu?: RoleMenu[];
  menu_screen?: MenuScreen[];
  other_menu?: Menu[];
  name?: string;
}