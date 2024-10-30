import { MenuScreens } from './MenuScreens';
import { RouteScreens } from './RouteScreens';
import { RoleScreens } from './RoleScreens';
import { ScreenTranslations } from './ScreenTranslations';

export type Screens = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menu_screens?: MenuScreens[];
  route_screens?: RouteScreens[];
  role_screens?: RoleScreens[];
  screen_translations?: ScreenTranslations[];
  name?: string;
  description?: string;
}