import { User } from './User';
import { MultifactorLocale } from './MultifactorLocale';

export type Multifactor = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  user?: User[];
  multifactor_locale?: MultifactorLocale[];
  name?: string;
}