import { MenuDiario } from './menuDiario';

export interface TipoMenu {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  nombre?: string;
  impuesto?: number;
  menus_diarios?: MenuDiario[] | null;
};
