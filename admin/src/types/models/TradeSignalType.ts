import { Simulation } from './Simulation';
import { Operation } from './Operation';

export type TradeSignalType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  simulation?: Simulation[];
  operation?: Operation[];
}