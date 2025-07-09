import { Plato } from './plato';
import { TipoMenu } from './tipoMenu';

export interface MenuDiario {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  dia: string;
  primero?: Plato | null;
  segundo?: Plato | null;
  postre?: Plato | null;
  precio?: number;
  sum_precio?: number;
  tipo_menu?: TipoMenu | null;
};
