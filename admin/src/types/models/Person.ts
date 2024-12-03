import { File } from './File';
import { PersonType } from './PersonType';
import { PersonAddress } from './PersonAddress';
import { PersonContact } from './PersonContact';
import { PersonValue } from './PersonValue';
import { PersonDocument } from './PersonDocument';
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
  person_address?: PersonAddress[];
  person_contact?: PersonContact[];
  person_value?: PersonValue[];
  person_document?: PersonDocument[];
  person_custom?: PersonCustom[];
}