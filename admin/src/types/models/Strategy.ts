import { Operation } from './Operation';

export type Strategy = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  operation?: Operation[];
}