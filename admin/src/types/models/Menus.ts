import { MenuScreens } from './MenuScreens';
import { MenuTranslations } from './MenuTranslations';
import { RoleMenus } from './RoleMenus';

export type Menus = {
  id?: number;
  menu_id?: number;
  slug: string;
  url?: string;
  order?: number;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menus?: Menus;
  menu_screens?: MenuScreens[];
  other_menus?: Menus[];
  menu_translations?: MenuTranslations[];
  role_menus?: RoleMenus[];
  name?: string;
}