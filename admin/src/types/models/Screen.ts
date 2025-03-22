import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';
import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  name?: string;
  description?: string;
}