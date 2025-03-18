import { Dashboard } from './Dashboard';
import { Locale } from './Locale';

export type DashboardLocale = {
  dashboard_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  dashboard?: Dashboard;
  locale?: Locale;
}