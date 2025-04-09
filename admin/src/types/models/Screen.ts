import { RoleScreen } from './RoleScreen';
import { RouteScreen } from './RouteScreen';
import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  role_screen?: RoleScreen[];
  route_screen?: RouteScreen[];
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  name?: string;
  description?: string;
}