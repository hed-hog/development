import { ScreenLocale } from './ScreenLocale';
import { RouteScreen } from './RouteScreen';
import { RoleScreen } from './RoleScreen';
import { MenuScreen } from './MenuScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  screen_locale?: ScreenLocale[];
  route_screen?: RouteScreen[];
  role_screen?: RoleScreen[];
  menu_screen?: MenuScreen[];
  name?: string;
  description?: string;
}