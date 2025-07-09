import { Plato } from './plato';

export interface Venta {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  platos?: Plato[] | null;
  cantidad: number;
  total_venta: number;
};
