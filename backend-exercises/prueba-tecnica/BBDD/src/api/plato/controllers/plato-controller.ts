import { DOCUMENT_TYPES } from "../../../consts/document-types";

export default {
    async getDishesRanked(ctx) {
        const rankedDishes = await strapi.service(DOCUMENT_TYPES.DISH_SERVICE).getDishesRanking();

        ctx.body = {
            data: {
                rankedDishes
            },
            meta: {
                total: rankedDishes.length
            }
        }
    }
}