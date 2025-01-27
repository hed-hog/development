import { Event } from './Event';
import { Locale } from './Locale';

export type EventLocale = {
  event_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  event?: Event;
  locale?: Locale;
}