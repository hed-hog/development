import { Banking } from './Banking';
import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type Strategy = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  banking?: Banking[];
  simulation?: Simulation[];
  operation?: Operation[];
}