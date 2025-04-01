import { RoleMenu } from './RoleMenu';
import { MenuLocale } from './MenuLocale';
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
  role_menu?: RoleMenu[];
  other_menu?: Menu[];
  menu_locale?: MenuLocale[];
  menu_screen?: MenuScreen[];
  name?: string;
}