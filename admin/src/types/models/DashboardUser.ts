import { DashboardItem } from './DashboardItem';
import { User } from './User';

export type DashboardUser = {
  id?: number;
  item_id: number;
  user_id: number;
  width: number;
  height: number;
  x_axis: number;
  y_axis: number;
  created_at?: string;
  updated_at?: string;
  dashboard_item?: DashboardItem;
  user?: User;
}