<<<<<<< HEAD
import { WalletPerson } from './WalletPerson';
import { WalletTransaction } from './WalletTransaction';
=======
import { WalletTransaction } from './WalletTransaction';
import { WalletPerson } from './WalletPerson';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type Wallet = {
  id?: number;
  name: string;
  balance: any;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  wallet_person?: WalletPerson[];
  wallet_transaction?: WalletTransaction[];
=======
  wallet_transaction?: WalletTransaction[];
  wallet_person?: WalletPerson[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}