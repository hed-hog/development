import { User } from './User';
import { Banking } from './Banking';
import { StockExchange } from './StockExchange';
import { Strategy } from './Strategy';
import { TradeSignalType } from './TradeSignalType';
import { Coin } from './Coin';
import { Operation } from './Operation';

export type Simulation = {
  id?: number;
  user_id: number;
  banking_id: number;
  stock_exchange_id: number;
  strategy_id: number;
  trade_signal_type_id: number;
  coin_id: number;
  layers: number;
  leverage?: any;
  margin_used: number;
  first_order: number;
  mmr: number;
  stop_loss: number;
  start_time: string;
  end_time: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
  banking?: Banking;
  stock_exchange?: StockExchange;
  strategy?: Strategy;
  trade_signal_type?: TradeSignalType;
  coin?: Coin;
  operation?: Operation[];
}