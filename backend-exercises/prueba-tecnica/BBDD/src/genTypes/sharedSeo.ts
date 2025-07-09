import { Media } from './media';
import { SharedOpenGraph } from './sharedOpenGraph';

export interface SharedSeo {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  metaImage?: Media | null;
  openGraph?: SharedOpenGraph | null;
  keywords?: string;
  metaRobots?: string;
  metaViewport?: string;
  canonicalURL?: string;
  structuredData?: Record<string, any>;
};
