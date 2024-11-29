import { RouteScreen } from './RouteScreen';
import { MenuScreen } from './MenuScreen';
import { RoleScreen } from './RoleScreen';
import { ScreenLocale } from './ScreenLocale';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  menu_screen?: MenuScreen[];
  role_screen?: RoleScreen[];
  screen_locale?: ScreenLocale[];
  name?: string;
  description?: string;
}