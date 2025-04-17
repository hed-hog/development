import { File } from './File';
import { PersonType } from './PersonType';
<<<<<<< HEAD
import { PersonUser } from './PersonUser';
import { PersonValue } from './PersonValue';
import { PersonDocument } from './PersonDocument';
import { PersonContact } from './PersonContact';
import { PersonAddress } from './PersonAddress';
import { PersonCustom } from './PersonCustom';
import { ChatMessage } from './ChatMessage';
import { ChatPerson } from './ChatPerson';
import { Rating } from './Rating';
import { Payment } from './Payment';
import { SubscriptionPerson } from './SubscriptionPerson';
import { SubscriptionCancel } from './SubscriptionCancel';
=======
import { PersonCustom } from './PersonCustom';
import { PersonDocument } from './PersonDocument';
import { ChatMessage } from './ChatMessage';
import { SubscriptionPerson } from './SubscriptionPerson';
import { PersonContact } from './PersonContact';
import { ChatPerson } from './ChatPerson';
import { PersonUser } from './PersonUser';
import { PersonAddress } from './PersonAddress';
import { Payment } from './Payment';
import { PersonValue } from './PersonValue';
import { SubscriptionCancel } from './SubscriptionCancel';
import { Rating } from './Rating';
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
import { WalletPerson } from './WalletPerson';

export type Person = {
  id?: number;
  name: string;
  photo_id?: number;
  type_id: number;
  birth_at?: string;
  created_at?: string;
  updated_at?: string;
  file?: File;
  person_type?: PersonType;
<<<<<<< HEAD
  person_user?: PersonUser[];
  person_value?: PersonValue[];
  person_document?: PersonDocument[];
  person_contact?: PersonContact[];
  person_address?: PersonAddress[];
  person_custom?: PersonCustom[];
  chat_message?: ChatMessage[];
  chat_person?: ChatPerson[];
  rating?: Rating[];
  payment?: Payment[];
  subscription_person?: SubscriptionPerson[];
  subscription_cancel?: SubscriptionCancel[];
=======
  person_custom?: PersonCustom[];
  person_document?: PersonDocument[];
  chat_message?: ChatMessage[];
  subscription_person?: SubscriptionPerson[];
  person_contact?: PersonContact[];
  chat_person?: ChatPerson[];
  person_user?: PersonUser[];
  person_address?: PersonAddress[];
  payment?: Payment[];
  person_value?: PersonValue[];
  subscription_cancel?: SubscriptionCancel[];
  rating?: Rating[];
>>>>>>> 58163a57f79790fdb391dfb493730dd7a648e651
  wallet_person?: WalletPerson[];
}