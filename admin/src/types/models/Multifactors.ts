import { Users } from './Users';
import { MultifactorTranslations } from './MultifactorTranslations';

export type Multifactors = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  users?: Users[];
  multifactor_translations?: MultifactorTranslations[];
}