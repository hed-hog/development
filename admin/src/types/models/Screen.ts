import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';
import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}