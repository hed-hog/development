import { RoleScreen } from './RoleScreen';
import { ScreenLocale } from './ScreenLocale';
import { MenuScreen } from './MenuScreen';
import { RouteScreen } from './RouteScreen';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  role_screen?: RoleScreen[];
  screen_locale?: ScreenLocale[];
  menu_screen?: MenuScreen[];
  route_screen?: RouteScreen[];
  name?: string;
  description?: string;
}