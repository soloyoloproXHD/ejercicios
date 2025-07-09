import { Media } from './media';

export interface SharedOpenGraph {
  id?: number;
  ogTitle: string;
  ogDescription: string;
  ogImage?: Media | null;
  ogUrl?: string;
  ogType?: string;
};
