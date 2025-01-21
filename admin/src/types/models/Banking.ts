import { User } from './User';
import { StockExchange } from './StockExchange';
import { Strategy } from './Strategy';
import { Operation } from './Operation';
import { Simulation } from './Simulation';

export type Banking = {
  id?: number;
  name: string;
  user_id: number;
  stock_exchange_id: number;
  strategy_id: number;
  balance: any;
  created_at?: string;
  updated_at?: string;
  user?: User;
  stock_exchange?: StockExchange;
  strategy?: Strategy;
  operation?: Operation[];
  simulation?: Simulation[];
}