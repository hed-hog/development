import { ScreenLocale } from './ScreenLocale';
import { RoleScreen } from './RoleScreen';
import { MenuScreen } from './MenuScreen';
import { RouteScreen } from './RouteScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  role_screen?: RoleScreen[];
  menu_screen?: MenuScreen[];
  route_screen?: RouteScreen[];
  name?: string;
  description?: string;
}