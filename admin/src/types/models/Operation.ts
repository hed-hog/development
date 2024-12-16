import { User } from './User';
import { Banking } from './Banking';
import { StockExchange } from './StockExchange';
import { Strategy } from './Strategy';
import { TradeSignalType } from './TradeSignalType';
import { Coin } from './Coin';

export type Operation = {
  id?: number;
  user_id: number;
  banking_id: number;
  stock_exchange_id: number;
  strategy_id: number;
  trade_signal_type_id: number;
  coin_id: number;
  layers: number;
  leverage?: any;
  created_at?: string;
  updated_at?: string;
  user?: User;
  banking?: Banking;
  stock_exchange?: StockExchange;
  strategy?: Strategy;
  trade_signal_type?: TradeSignalType;
  coin?: Coin;
}