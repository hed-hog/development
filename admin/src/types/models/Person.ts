import { File } from './File';
import { PersonType } from './PersonType';
import { ChatMessage } from './ChatMessage';
import { PersonContact } from './PersonContact';
import { ChatRoomPerson } from './ChatRoomPerson';
import { PersonUser } from './PersonUser';
import { PersonAddress } from './PersonAddress';
import { Payment } from './Payment';
import { SubscriptionCancel } from './SubscriptionCancel';
import { PersonValue } from './PersonValue';
import { SubscriptionPerson } from './SubscriptionPerson';
import { PersonCustom } from './PersonCustom';
import { PersonDocument } from './PersonDocument';

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
  chat_message?: ChatMessage[];
  person_contact?: PersonContact[];
  chat_room_person?: ChatRoomPerson[];
  person_user?: PersonUser[];
  person_address?: PersonAddress[];
  payment?: Payment[];
  subscription_cancel?: SubscriptionCancel[];
  person_value?: PersonValue[];
  subscription_person?: SubscriptionPerson[];
  person_custom?: PersonCustom[];
  person_document?: PersonDocument[];
}