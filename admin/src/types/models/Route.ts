import { RouteMethodEnum } from './RouteMethodEnum';
import { RoleRoute } from './RoleRoute';
import { RouteScreen } from './RouteScreen';

export type Route = {
  id?: number;
  url: string;
  method: RouteMethodEnum;
  description?: string;
  created_at?: string;
  updated_at?: string;
  role_route?: RoleRoute[];
  route_screen?: RouteScreen[];
}