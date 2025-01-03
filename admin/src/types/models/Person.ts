import { File } from './File';
import { PersonType } from './PersonType';
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
  person_value?: PersonValue[];
}