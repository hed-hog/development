import { DashboardComponent } from './DashboardComponent';
import { Locale } from './Locale';

export type DashboardComponentLocale = {
  component_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  dashboard_component?: DashboardComponent;
  locale?: Locale;
}