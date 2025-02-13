import { EventType } from './EventType';
import { EventOccurrence } from './EventOccurrence';
import { EventLocale } from './EventLocale';

export type Event = {
  id?: number;
  type_id: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  event_type?: EventType;
  event_occurrence?: EventOccurrence[];
  event_locale?: EventLocale[];
  name?: string;
}