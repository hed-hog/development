import { MenuScreen } from './MenuScreen';
import { ScreenLocale } from './ScreenLocale';
import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menu_screen?: MenuScreen[];
  screen_locale?: ScreenLocale[];
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}