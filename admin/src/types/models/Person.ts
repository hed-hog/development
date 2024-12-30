import { File } from './File';
import { PersonType } from './PersonType';
import { PersonValue } from './PersonValue';
import { PersonContact } from './PersonContact';
import { PersonCustom } from './PersonCustom';
import { PersonAddress } from './PersonAddress';
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
  person_value?: PersonValue[];
  person_contact?: PersonContact[];
  person_custom?: PersonCustom[];
  person_address?: PersonAddress[];
  person_document?: PersonDocument[];
}