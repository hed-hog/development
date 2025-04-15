import { Person } from './Person';
import { User } from './User';

export type PersonUser = {
  id?: number;
  person_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  person?: Person;
  user?: User;
}