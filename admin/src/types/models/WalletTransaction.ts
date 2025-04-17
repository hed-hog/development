import { WalletTransactionTypeEnum } from './WalletTransactionTypeEnum';
import { Wallet } from './Wallet';

export type WalletTransaction = {
  id?: number;
  wallet_id: number;
  type: WalletTransactionTypeEnum;
  amount: any;
  created_at?: string;
  updated_at?: string;
  wallet?: Wallet;
}