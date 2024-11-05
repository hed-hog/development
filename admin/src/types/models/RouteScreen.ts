import { Route } from './Route';
import { Screen } from './Screen';

export type RouteScreen = {
  route_id?: number;
  screen_id?: number;
  created_at?: string;
  updated_at?: string;
  route?: Route;
  screen?: Screen;
}