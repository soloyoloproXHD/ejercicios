import { TipoMenu } from "./tipo-menu-types";
import { Plato } from "./plato-types";

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
    sum_precio?: number;
    tipo_menu?: TipoMenu | null;
}

export interface MenuDiarioLifecycle {
    primero?: { 
        connect?: Array<{ id: number }>;
        disconnect?: Array<{ id: number }>;
    };
    segundo?: { 
        connect?: Array<{ id: number }>;
        disconnect?: Array<{ id: number }>;
    };
    postre?: { 
        connect?: Array<{ id: number }>;
        disconnect?: Array<{ id: number }>;
    };
    tipo_menu?: { 
        connect?: Array<{ id: number }>;
        disconnect?: Array<{ id: number }>;
    };
    sum_precio?: number;
    precio?: number;
    connect?: Array<{ id: number }>;
    disconnect?: Array<{ id: number }>;
}

export interface PriceParams {
    firstID: number;
    secondID: number;
    dessertID: number;
    menuTypeID: number;
}

export interface PriceResults {
    addition: number;
    total: number;
}