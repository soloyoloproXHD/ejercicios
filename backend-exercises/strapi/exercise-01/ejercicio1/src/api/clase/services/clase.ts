/**
 * clase service
 */

import { factories } from '@strapi/strapi';
import type { Core } from '@strapi/types';

export default factories.createCoreService('api::clase.clase', ({strapi}: {strapi: Core.Strapi}) => ({
    
    async asignarProfesor(nombreClase: string, idProfesor: string) {
        try {
            if (idProfesor === undefined || nombreClase === undefined) {
                return new Error('Faltan parámetros necesarios');
            }
            const clases = await strapi.documents('api::clase.clase').findFirst(
                {
                    filters: {
                        titulo: {
                            $eq: nombreClase
                        }
                    },
                    populate: {
                        profesores: true
                    }
                }
            );
            if (!clases) {
                return new Error('No se encontraron clases con ese nombre');
            }
            const profesor = await strapi.documents('api::profesor.profesor').findOne({
                documentId: idProfesor
            });
            if (!profesor) {
                return new Error('No se encontró el profesor especificado');
            }

            console.log(clases.profesores.length);
            console.log(clases.documentId);
            console.log(profesor.nClasesAsignadas);

            if (clases.profesores.length >= 3) {
                return new Error('La clase ya tiene 3 profesores asignados');
            }else if (profesor.nClasesAsignadas >= 5) {
                return new Error('El profesor ya tiene 5 clases asignadas');
            }

            await strapi.documents('api::clase.clase').update({
                documentId: clases.documentId,
                data: {
                    profesores: {
                        connect: [profesor.documentId]
                    }
                }
            });

            console.log('Profesor asignado correctamente a la clase');
            
            return {
                message: 'ok',
                data: {
                    clase: clases.titulo,
                    profesor: profesor.nombre,
                    profesorId: profesor.id
                }
            };
            
        } catch (error) {
            console.error('Error al asignar profesor:', error);
            return new Error('Error interno al asignar profesor a la clase');
        }
    }
}));
