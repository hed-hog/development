import { Bot } from './Bot';
import { IndiceType } from './IndiceType';

export type Indice = {
  id?: number;
  bot_id?: number;
  type_id: number;
  slug: string;
  description?: string;
  in_inght_var_percentage?: any;
  in_inght_tech_rating?: any;
  future_var_percentage?: any;
  future_tech_rating?: any;
  created_at?: string;
  updated_at?: string;
  bot?: Bot;
  indice_type?: IndiceType;
}