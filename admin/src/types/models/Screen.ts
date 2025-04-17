import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';
import { RoleScreen } from './RoleScreen';
import { RouteScreen } from './RouteScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  role_screen?: RoleScreen[];
  route_screen?: RouteScreen[];
  name?: string;
  description?: string;
}