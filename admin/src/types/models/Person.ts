import { File } from './File';
import { PersonType } from './PersonType';
import { PersonDocument } from './PersonDocument';
import { ChatMessage } from './ChatMessage';
import { WalletPerson } from './WalletPerson';
import { ChatRoomPerson } from './ChatRoomPerson';
import { PersonContact } from './PersonContact';
import { SubscriptionCancel } from './SubscriptionCancel';
import { Payment } from './Payment';
import { PersonAddress } from './PersonAddress';
import { PersonUser } from './PersonUser';
import { PersonValue } from './PersonValue';
import { SubscriptionPerson } from './SubscriptionPerson';
import { PersonCustom } from './PersonCustom';

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
  person_document?: PersonDocument[];
  chat_message?: ChatMessage[];
  wallet_person?: WalletPerson[];
  chat_room_person?: ChatRoomPerson[];
  person_contact?: PersonContact[];
  subscription_cancel?: SubscriptionCancel[];
  payment?: Payment[];
  person_address?: PersonAddress[];
  person_user?: PersonUser[];
  person_value?: PersonValue[];
  subscription_person?: SubscriptionPerson[];
  person_custom?: PersonCustom[];
}