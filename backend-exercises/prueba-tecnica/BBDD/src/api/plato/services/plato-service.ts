import { Core } from "@strapi/strapi";
import type { PlatoPopular } from '../../../type/plato-types';

export default ({strapi}: {strapi: Core.Strapi}) => ({
    async obtenerPlatosPopulares(): Promise<PlatoPopular[]> {
        const contador: Record<number, number> = {};
        
        const ventas = await strapi.documents('api::venta.venta').findMany({
            populate: {
                platos: true,
            },
        });

        ventas.forEach((venta) => {
            venta.platos.forEach((plato) => {
                contador[plato.id] = (contador[plato.id] || 0) + venta.cantidad;
            });
        });

        const idsOrdenados = Object.entries(contador)
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => parseInt(id));
        
        if (idsOrdenados.length === 0) {
            return [];
        }

        const platos = await strapi.documents('api::plato.plato').findMany({
            filters: { id: { $in: idsOrdenados } },
            fields: ['id', 'nombre', 'precio'],
        });

        const platosOrdenados: PlatoPopular[] = idsOrdenados
            .map((id) => {
                const p = platos.find((x) => x.id === id);
                if (!p) return null;
                return {
                    id: p.id,
                    nombre: p.nombre,
                    cantidad_vendido: contador[p.id],
                }
            }).filter((x): x is PlatoPopular => x !== null);

        return platosOrdenados;
    }
});