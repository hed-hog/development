import { RouteScreen } from './RouteScreen';
import { ScreenLocale } from './ScreenLocale';
import { RoleScreen } from './RoleScreen';
import { MenuScreen } from './MenuScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  screen_locale?: ScreenLocale[];
  role_screen?: RoleScreen[];
  menu_screen?: MenuScreen[];
  name?: string;
  description?: string;
}