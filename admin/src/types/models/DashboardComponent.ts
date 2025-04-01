import { DashboardItem } from './DashboardItem';
import { DashboardComponentLocale } from './DashboardComponentLocale';

export type DashboardComponent = {
  id?: number;
  slug: string;
  path: string;
  min_width?: number;
  max_width?: number;
  min_height?: number;
  max_height?: number;
  width: number;
  height: number;
  is_resizable?: boolean;
  created_at?: string;
  updated_at?: string;
  dashboard_item?: DashboardItem[];
  dashboard_component_locale?: DashboardComponentLocale[];
  name?: string;
}