import { File } from './File';
import { PersonType } from './PersonType';
import { PersonAddress } from './PersonAddress';
import { PersonCustom } from './PersonCustom';
import { PersonContact } from './PersonContact';
import { PersonDocument } from './PersonDocument';
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
  person_address?: PersonAddress[];
  person_custom?: PersonCustom[];
  person_contact?: PersonContact[];
  person_document?: PersonDocument[];
  person_value?: PersonValue[];
}