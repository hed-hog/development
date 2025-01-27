import { Event } from './Event';

export type EventType = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  event?: Event[];
}