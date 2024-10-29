import { PersonCustomTypeTranslations } from './PersonCustomTypeTranslations';
import { PersonCustoms } from './PersonCustoms';

export type PersonCustomTypes = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_custom_type_translations?: PersonCustomTypeTranslations[];
  person_customs?: PersonCustoms[];
}