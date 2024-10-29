import { RoutesMethodEnum } from './RoutesMethodEnum';
import { RouteScreens } from './RouteScreens';
import { RoleRoutes } from './RoleRoutes';

export type Routes = {
  id?: number;
  url: string;
  method: RoutesMethodEnum;
  created_at?: string;
  updated_at?: string;
  route_screens?: RouteScreens[];
  role_routes?: RoleRoutes[];
}