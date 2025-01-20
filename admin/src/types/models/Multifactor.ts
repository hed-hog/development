import { MultifactorLocale } from './MultifactorLocale';
import { User } from './User';

export type Multifactor = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  multifactor_locale?: MultifactorLocale[];
  user?: User[];
  name?: string;
}