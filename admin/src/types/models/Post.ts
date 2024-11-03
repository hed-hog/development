import { Author } from './Author';
import { Category } from './Category';

export type Post = {
  id?: number;
  title: string;
  content: string;
  author_id: number;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  author?: Author;
  category?: Category;
}