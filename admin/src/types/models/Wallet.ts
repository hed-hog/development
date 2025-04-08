import { WalletTransaction } from './WalletTransaction';
import { WalletPerson } from './WalletPerson';

export type Wallet = {
  id?: number;
  name: string;
  balance: any;
  created_at?: string;
  updated_at?: string;
  wallet_transaction?: WalletTransaction[];
  wallet_person?: WalletPerson[];
}