import { ScreenLocale } from './ScreenLocale';
import { RouteScreen } from './RouteScreen';
import { MenuScreen } from './MenuScreen';
import { RoleScreen } from './RoleScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  route_screen?: RouteScreen[];
  menu_screen?: MenuScreen[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}