import { Post } from './Post';

export type Author = {
  id?: number;
  name: string;
  email: string;
  post?: Post[];
}