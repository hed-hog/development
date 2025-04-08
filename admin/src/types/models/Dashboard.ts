import { DashboardLocale } from './DashboardLocale';
import { DashboardItem } from './DashboardItem';

export type Dashboard = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  dashboard_locale?: DashboardLocale[];
  dashboard_item?: DashboardItem[];
  name?: string;
}