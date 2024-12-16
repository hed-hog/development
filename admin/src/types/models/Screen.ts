import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';
import { MenuScreen } from './MenuScreen';
import { ScreenLocale } from './ScreenLocale';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  menu_screen?: MenuScreen[];
  screen_locale?: ScreenLocale[];
  name?: string;
  description?: string;
}