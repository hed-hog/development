import { MenuScreen } from './MenuScreen';
import { RoleMenu } from './RoleMenu';
import { MenuLocale } from './MenuLocale';

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
  other_menu?: Menu[];
  menu_screen?: MenuScreen[];
  role_menu?: RoleMenu[];
  menu_locale?: MenuLocale[];
  name?: string;
}