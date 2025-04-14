import { Person } from './Person';

export type Rating = {
  id?: number;
  comment: string;
  note: any;
  person_id: number;
  created_at?: string;
  updated_at?: string;
  person?: Person;
}