import { File } from './File';
import { PersonType } from './PersonType';
import { PersonContact } from './PersonContact';
import { PersonCustom } from './PersonCustom';
import { PersonDocument } from './PersonDocument';
import { PersonAddress } from './PersonAddress';

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
  person_contact?: PersonContact[];
  person_custom?: PersonCustom[];
  person_document?: PersonDocument[];
  person_address?: PersonAddress[];
}