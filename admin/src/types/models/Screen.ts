import { RoleScreen } from './RoleScreen';
import { MenuScreen } from './MenuScreen';
import { RouteScreen } from './RouteScreen';
import { ScreenLocale } from './ScreenLocale';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  role_screen?: RoleScreen[];
  menu_screen?: MenuScreen[];
  route_screen?: RouteScreen[];
  screen_locale?: ScreenLocale[];
  name?: string;
  description?: string;
}