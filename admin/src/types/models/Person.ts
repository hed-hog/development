import { File } from './File';
import { PersonType } from './PersonType';
import { PersonUser } from './PersonUser';
import { PersonValue } from './PersonValue';
import { PersonCustom } from './PersonCustom';
import { PersonDocument } from './PersonDocument';
import { Payment } from './Payment';
import { ChatMessage } from './ChatMessage';
import { SubscriptionCancel } from './SubscriptionCancel';
import { PersonContact } from './PersonContact';
import { ChatRoomPerson } from './ChatRoomPerson';
import { PersonAddress } from './PersonAddress';
import { WalletPerson } from './WalletPerson';
import { SubscriptionPerson } from './SubscriptionPerson';

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
  person_user?: PersonUser[];
  person_value?: PersonValue[];
  person_custom?: PersonCustom[];
  person_document?: PersonDocument[];
  payment?: Payment[];
  chat_message?: ChatMessage[];
  subscription_cancel?: SubscriptionCancel[];
  person_contact?: PersonContact[];
  chat_room_person?: ChatRoomPerson[];
  person_address?: PersonAddress[];
  wallet_person?: WalletPerson[];
  subscription_person?: SubscriptionPerson[];
}