/**
 * profesor service
 */

import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

export default factories.createCoreService('api::profesor.profesor', ({ strapi }: {strapi: Core.Strapi}) => ({
    
    async findEventosByProfesorNombre(nombre: string) {
        try {
            const profesores = await strapi.documents('api::profesor.profesor').findMany(
                {
                    filters: {
                        nombre: { $eq: nombre },
                    },
                    populate: {
                        eventos: {
                            populate: {
                                detalles_adicionales: true,
                            }
                        }
                    }
                },
            );

            if (profesores.length === 0) {
                throw new Error('No se encontraron profesores que coincidan');
            }
            const profesor = profesores[0];

            if (!profesor.eventos || profesor.eventos.length === 0) {
                throw new Error('El profesor no tiene eventos asociados');
            }

            return {
                profesor: {
                    id: profesor.id,
                    documentId: profesor.documentId,
                    nombre: profesor.nombre,
                    apellido: profesor.apellido
                },
                eventos: profesor.eventos,
                meta: {
                    eventosCount: profesor.eventos.length,
                    timestamp: new Date().toISOString()
                }
            };

        } catch (error) {
            throw new Error('Error al obtener los eventos del profesor');
        }
    }

}));
