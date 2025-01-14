import { User } from './User';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type Banking = {
  id?: number;
  name: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  user?: User;
  simulation?: Simulation[];
  operation?: Operation[];
}