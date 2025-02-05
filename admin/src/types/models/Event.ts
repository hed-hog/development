import { EventType } from './EventType';
import { EventLocale } from './EventLocale';
import { EventOccurrence } from './EventOccurrence';

export type Event = {
  id?: number;
  type_id: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  event_type?: EventType;
  event_locale?: EventLocale[];
  event_occurrence?: EventOccurrence[];
  name?: string;
}