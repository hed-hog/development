import { MenuScreen } from './MenuScreen';
import { RoleScreen } from './RoleScreen';
import { RouteScreen } from './RouteScreen';
import { ScreenLocale } from './ScreenLocale';

export type Screen = {
  id?: number;
  slug: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  menu_screen?: MenuScreen[];
  role_screen?: RoleScreen[];
  route_screen?: RouteScreen[];
  screen_locale?: ScreenLocale[];
  name?: string;
  description?: string;
}