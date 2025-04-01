import { File } from './File';
import { PersonType } from './PersonType';
import { PersonUser } from './PersonUser';
import { PersonValue } from './PersonValue';
import { PersonDocument } from './PersonDocument';
import { PersonContact } from './PersonContact';
import { PersonAddress } from './PersonAddress';
import { ChatMessage } from './ChatMessage';
import { PersonCustom } from './PersonCustom';
import { ChatRoomPerson } from './ChatRoomPerson';
import { Payment } from './Payment';
import { SubscriptionPerson } from './SubscriptionPerson';
import { SubscriptionCancel } from './SubscriptionCancel';

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
  person_document?: PersonDocument[];
  person_contact?: PersonContact[];
  person_address?: PersonAddress[];
  chat_message?: ChatMessage[];
  person_custom?: PersonCustom[];
  chat_room_person?: ChatRoomPerson[];
  payment?: Payment[];
  subscription_person?: SubscriptionPerson[];
  subscription_cancel?: SubscriptionCancel[];
}