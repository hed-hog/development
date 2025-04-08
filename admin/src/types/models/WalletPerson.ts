import { Wallet } from './Wallet';
import { Person } from './Person';

export type WalletPerson = {
  id?: number;
  wallet_id: number;
  person_id: number;
  created_at?: string;
  updated_at?: string;
  wallet?: Wallet;
  person?: Person;
}