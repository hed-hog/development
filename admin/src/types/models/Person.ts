import { File } from './File';
import { PersonType } from './PersonType';
import { PersonDocument } from './PersonDocument';
import { PersonContact } from './PersonContact';
import { PersonAddress } from './PersonAddress';
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
  person_contact?: PersonContact[];
  person_address?: PersonAddress[];
  person_custom?: PersonCustom[];
}