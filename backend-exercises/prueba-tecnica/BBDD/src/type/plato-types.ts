import { Venta } from "./venta-types";
import { MenuDiario } from "./menu-types";

export interface Plato {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    foto: Media[] | null;
    nombre: string;
    precio: number;
    Alergenos?: Alergenos[] | null;
    tipo: "Primero" | "Segundo" | "Postre";
    menus_diarios?: MenuDiario | null;
    ventas?: Venta[] | null;
};

export interface Alergenos {
    id?: number;
    nombre: string;
    descripcion: string;
    icono?: Media | null;
}

export interface PlatoPopular {
    id: number;
    nombre: string;
    cantidad_vendido: number;
}

export interface Media {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
    hash: string;
    ext: string;
    mime: string;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    url: string;
}