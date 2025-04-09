import { WalletPerson } from './WalletPerson';
import { WalletTransaction } from './WalletTransaction';

export type Wallet = {
  id?: number;
  name: string;
  balance: any;
  created_at?: string;
  updated_at?: string;
  wallet_person?: WalletPerson[];
  wallet_transaction?: WalletTransaction[];
}