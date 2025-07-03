/**
 * clase controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::clase.clase', ({ strapi }) => ({

    async asignarProfesor(ctx) {
        try {
            const {nombreClase, idProfesor} = ctx.params;

            const claseAsignada = await strapi.service('api::clase.clase').asignarProfesor(nombreClase, idProfesor);

            if (claseAsignada instanceof Error) {
                return ctx.badRequest(claseAsignada.message);
            }

            return ctx.send(claseAsignada);
        } catch (error) {
            console.error('Error al asignar profesor:', error);
            return ctx.internalServerError('Error interno al asignar profesor a la clase');
        }
    },
}));
