import { DashboardComponent } from './DashboardComponent';
import { Dashboard } from './Dashboard';
import { DashboardUser } from './DashboardUser';

export type DashboardItem = {
  id?: number;
  component_id: number;
  dashboard_id: number;
  width: number;
  height: number;
  x_axis: number;
  y_axis: number;
  created_at?: string;
  updated_at?: string;
  dashboard_component?: DashboardComponent;
  dashboard?: Dashboard;
  dashboard_user?: DashboardUser[];
}