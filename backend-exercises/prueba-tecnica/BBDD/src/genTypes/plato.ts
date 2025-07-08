import { Media } from './media';
import { ComidaAlergenos } from './comidaAlergenos';
import { MenuDiario } from './menuDiario';
import { Venta } from './venta';

export interface Plato {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  foto?: Media[] | null;
  nombre?: string;
  precio?: number;
  Alergenos?: ComidaAlergenos[] | null;
  tipo?: "Primero" | "Segundo" | "Postre";
  menus_diarios?: MenuDiario | null;
  ventas?: Venta[] | null;
};
