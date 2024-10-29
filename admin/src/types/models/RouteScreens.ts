import { Routes } from './Routes';
import { Screens } from './Screens';

export type RouteScreens = {
  route_id?: number;
  screen_id?: number;
  created_at?: string;
  updated_at?: string;
  routes?: Routes;
  screens?: Screens;
}