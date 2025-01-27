import { Person } from './Person';

export type PersonValue = {
  id?: number;
  person_id: number;
  value: string;
  created_at?: string;
  updated_at?: string;
  person?: Person;
}