import { MenuScreen } from './MenuScreen';
import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';
import { ScreenLocale } from './ScreenLocale';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menu_screen?: MenuScreen[];
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  screen_locale?: ScreenLocale[];
  name?: string;
  description?: string;
}