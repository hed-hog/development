import { Operation } from './Operation';
import { Simulation } from './Simulation';

export type TradeSignalType = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
  simulation?: Simulation[];
}