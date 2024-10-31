import { RouteScreen } from './RouteScreen';
import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';
import { RoleScreen } from './RoleScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  role_screen?: RoleScreen[];
  name?: string;
  description?: string;
}