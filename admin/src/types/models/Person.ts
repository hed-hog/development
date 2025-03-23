import { File } from './File';
import { PersonType } from './PersonType';
import { ChatRoomPerson } from './ChatRoomPerson';
import { PersonUser } from './PersonUser';
import { PersonValue } from './PersonValue';
import { PersonAddress } from './PersonAddress';
import { Payment } from './Payment';
import { PersonDocument } from './PersonDocument';
import { PersonCustom } from './PersonCustom';
import { PersonContact } from './PersonContact';
import { ChatMessage } from './ChatMessage';
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
  chat_room_person?: ChatRoomPerson[];
  person_user?: PersonUser[];
  person_value?: PersonValue[];
  person_address?: PersonAddress[];
  payment?: Payment[];
  person_document?: PersonDocument[];
  person_custom?: PersonCustom[];
  person_contact?: PersonContact[];
  chat_message?: ChatMessage[];
  subscription_person?: SubscriptionPerson[];
  subscription_cancel?: SubscriptionCancel[];
}