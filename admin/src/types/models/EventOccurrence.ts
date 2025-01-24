import { Event } from './Event';

export type EventOccurrence = {
  id?: number;
  event_id: number;
  event_at: string;
  created_at?: string;
  updated_at?: string;
  event?: Event;
}