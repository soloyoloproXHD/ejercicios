export default {
    async beforeCreate(event){
        const { data } = event.params;

        const menuService = strapi.service('api::menu-diario.menu-service');

        const primero = data.primero?.connect?.[0]?.id;
        const segundo = data.segundo?.connect?.[0]?.id;
        const postre = data.postre?.connect?.[0]?.id;
        const tipoMenu = data.tipo_menu?.connect?.[0]?.id;

        if (!primero && !segundo && !postre && !tipoMenu) {
            console.log("Skipping beforeCreate - datos vacíos, probablemente actualización");
            return;
        }
        
        await validarPlatos(data);

        console.log("Primero:", primero, "Segundo:", segundo, "Postre:", postre, "TipoMenu:", tipoMenu);

        const { suma, total } = await menuService.calcularPrecio({
            primeroID: primero,
            segundoID: segundo,
            postreID: postre,
            tipoMenuID: tipoMenu
        });

        console.log("Suma:", suma, "Total:", total);

        if (suma !== 0 && total !== 0) {
            data.sum_precio = suma;
            data.precio = total;
        }
    },

    async beforeUpdate(event) {
        const { data, where } = event.params;
        const { ApplicationError } = require('@strapi/utils').errors;
        
        const menuActual = await strapi.documents('api::menu-diario.menu-diario').findFirst({
            filters: where,
            populate: ['primero', 'segundo', 'postre', 'tipo_menu']
        });
        
        if (!menuActual) {
            throw new ApplicationError("Menu no encontrado");
        }
        
        const platosFinales = {
            primero: platoFinal(menuActual.primero, data.primero),
            segundo: platoFinal(menuActual.segundo, data.segundo),
            postre: platoFinal(menuActual.postre, data.postre)
        };
        
        const ids = Object.values(platosFinales).filter((id): id is number => id !== null);
        const uniqueIds = new Set(ids);
        
        if (uniqueIds.size !== ids.length) {
            throw new ApplicationError("No se pueden repetir los platos en diferentes categorias.");
        }
        
        const cambiosEnPlatos = data.primero || data.segundo || data.postre || data.tipo_menu;

        if (cambiosEnPlatos) {
            const servicio = strapi.service('api::menu-diario.menu-service');
            const tipoMenuFinal = data.tipo_menu?.connect?.[0]?.id || menuActual.tipo_menu?.id;
            
            const { suma, total } = await servicio.calcularPrecio({
                primeroID: platosFinales.primero,
                segundoID: platosFinales.segundo,
                postreID: platosFinales.postre,
                tipoMenuID: tipoMenuFinal
            });

            if (suma !== 0 && total !== 0) {
                data.sum_precio = suma;
                data.precio = total;
            }
        }
    }
}

async function validarPlatos(data: any) {
    const { ApplicationError } = require('@strapi/utils').errors;
    const ids: number[] = [];
    
    if (data.primero?.connect?.[0]?.id) {
        ids.push(data.primero.connect[0].id);
    }
    if (data.segundo?.connect?.[0]?.id) {
        ids.push(data.segundo.connect[0].id);
    }
    if (data.postre?.connect?.[0]?.id) {
        ids.push(data.postre.connect[0].id);
    }

    const uniqueIds = new Set(ids);

    if (uniqueIds.size !== ids.length) {
        throw new ApplicationError("No se pueden repetir los platos en diferentes categorias.");
    }
}

function platoFinal(platoActual: any, cambioPlato: any): number | null {
    if (cambioPlato?.connect && cambioPlato.connect.length > 0) {
        return cambioPlato.connect[0]?.id || null;
    }

    return platoActual?.id || null;
}