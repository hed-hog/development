import { RouteMethodEnum } from './RouteMethodEnum';
import { RouteScreen } from './RouteScreen';
import { RoleRoute } from './RoleRoute';

export type Route = {
  id?: number;
  url: string;
  method: RouteMethodEnum;
  description?: string;
  created_at?: string;
  updated_at?: string;
  route_screen?: RouteScreen[];
  role_route?: RoleRoute[];
}