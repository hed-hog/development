import { File } from './File';
import { PersonType } from './PersonType';
import { PersonDocument } from './PersonDocument';
import { ChatMessage } from './ChatMessage';
import { ChatRoomPerson } from './ChatRoomPerson';
import { Payment } from './Payment';
import { PersonContact } from './PersonContact';
import { PersonAddress } from './PersonAddress';
import { SubscriptionCancel } from './SubscriptionCancel';
import { PersonUser } from './PersonUser';
import { SubscriptionPerson } from './SubscriptionPerson';
import { PersonValue } from './PersonValue';
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
  chat_room_person?: ChatRoomPerson[];
  payment?: Payment[];
  person_contact?: PersonContact[];
  person_address?: PersonAddress[];
  subscription_cancel?: SubscriptionCancel[];
  person_user?: PersonUser[];
  subscription_person?: SubscriptionPerson[];
  person_value?: PersonValue[];
  person_custom?: PersonCustom[];
}