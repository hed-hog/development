import { DashboardItem } from './DashboardItem';
import { DashboardLocale } from './DashboardLocale';

export type Dashboard = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  dashboard_item?: DashboardItem[];
  dashboard_locale?: DashboardLocale[];
  name?: string;
}