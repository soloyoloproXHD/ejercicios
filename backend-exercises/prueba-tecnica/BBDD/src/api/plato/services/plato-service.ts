import { Core } from "@strapi/strapi";
import type { PlatoPopular } from '../../../type/plato-types';
import { DOCUMENT_TYPES, FIELDS } from "../../../consts/document-types"; 

export default ({strapi}: {strapi: Core.Strapi}) => ({
    async getDishesRanking(): Promise<PlatoPopular[]> {
        const accountant: Record<number, number> = {};
        
        const sales = await strapi.documents(DOCUMENT_TYPES.SALE_MODEL).findMany({
            populate: {
                platos: true,
            },
        });

        sales.forEach((sale) => {
            sale.platos.forEach((dish) => {
                accountant[dish.id] = (accountant[dish.id] || 0) + sale.cantidad;
            });
        });

        const sortedIDs = Object.entries(accountant)
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => parseInt(id));

        if (sortedIDs.length === 0) {
            return [];
        }

        const dishes = await strapi.documents('api::plato.plato').findMany({
            filters: { id: { $in: sortedIDs } },
            fields: [FIELDS.ID, FIELDS.NAME, FIELDS.PRICE],
        });

        const sortedDishes: PlatoPopular[] = sortedIDs
            .map((id) => {
                const p = dishes.find((x) => x.id === id);
                if (!p) return null;
                return {
                    id: p.id,
                    nombre: p.nombre,
                    cantidad_vendido: accountant[p.id],
                }
            }).filter((x): x is PlatoPopular => x !== null);

        return sortedDishes;
    }
});