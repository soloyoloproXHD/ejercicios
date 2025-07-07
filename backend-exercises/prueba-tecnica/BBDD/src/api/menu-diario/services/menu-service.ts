import { Core } from '@strapi/strapi';
import type { PrecioParams, PrecioResults } from '../../../type/menu-types';

export default ({strapi}: {strapi: Core.Strapi}) => ({
    async calcularPrecio(params: PrecioParams): Promise<PrecioResults> {
        const { primeroID, segundoID, postreID, tipoMenuID } = params;
        let suma = 0;

        console.log("IDs:", primeroID, segundoID, postreID, tipoMenuID);

        if (primeroID && segundoID && postreID && tipoMenuID    ) {
            console.log('Entré')
            const ids = [primeroID, segundoID, postreID].filter(Boolean) as number[];

            const validIds = ids.filter((id): id is number => !!id);

            await Promise.all(validIds.map(async id => {
                const plato = await strapi.documents('api::plato.plato').findFirst({
                    filters: { id },
                    fields: ['precio']
                });
                if (plato && typeof plato.precio === 'number') {
                    suma += plato.precio;
                }
            }));

            const tipoMenu = await strapi.documents('api::tipo-menu.tipo-menu').findFirst({
                filters: { id: tipoMenuID },
                fields: ['impuesto']
            });

            const impuesto = suma * (tipoMenu.impuesto/100);
            const total = suma + impuesto;

            return {
                suma,
                total
            };
        }
        return { suma: 0, total: 0 };
    }
})