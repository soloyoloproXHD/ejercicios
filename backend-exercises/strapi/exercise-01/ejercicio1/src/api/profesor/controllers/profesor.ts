/**
 * profesor controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::profesor.profesor', ({ strapi}) => ({

    async getEventosByNombre(ctx) {
        try {
            const { nombre } = ctx.params;

            const eventos = await strapi.service('api::profesor.profesor').findEventosByProfesorNombre(nombre);

            return ctx.send({
                data: eventos,
                message: 'Eventos obtenidos correctamente'
            });

        } catch (error) {
            if (error.message === 'No se encontraron profesores que conincidan' || 
                error.message === 'El profesor no tiene eventos asociados') {
                return ctx.notFound(error.message);
            }
            return ctx.internalServerError('Error al obtener los eventos', error);
        }
    }
}));
