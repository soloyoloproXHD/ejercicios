export default {
    async getPlatosPopulares(ctx) {
        const populares = await strapi.service('api::plato.plato-service').obtenerPlatosPopulares();

        ctx.body = {
            data: {
                populares
            },
            meta: {
                total: populares.length
            }
        }
    }
}