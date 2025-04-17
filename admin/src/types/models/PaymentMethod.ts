<<<<<<< HEAD
import { Payment } from './Payment';
import { PaymentMethodItem } from './PaymentMethodItem';
=======
import { PaymentMethodItem } from './PaymentMethodItem';
import { Payment } from './Payment';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651

export type PaymentMethod = {
  id?: number;
  slug: string;
  name: string;
  created_at?: string;
  updated_at?: string;
<<<<<<< HEAD
  payment?: Payment[];
  payment_method_item?: PaymentMethodItem[];
=======
  payment_method_item?: PaymentMethodItem[];
  payment?: Payment[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
}