import { File } from './File';
import { PersonType } from './PersonType';
import { Payment } from './Payment';
import { PersonValue } from './PersonValue';

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
  payment?: Payment[];
  person_value?: PersonValue[];
}