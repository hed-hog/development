import { Operation } from './Operation';
import { Banking } from './Banking';
import { Simulation } from './Simulation';

export type Strategy = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
  banking?: Banking[];
  simulation?: Simulation[];
}