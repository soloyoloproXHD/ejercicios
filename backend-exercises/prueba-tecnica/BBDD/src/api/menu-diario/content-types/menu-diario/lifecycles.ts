import { DOCUMENT_TYPES  } from "../../../../type/document-types";

export default {
    async beforeCreate(event){
        const { data } = event.params;

        const menuService = strapi.service(DOCUMENT_TYPES.MENU_DIARIO_CUSTOM_SERVICE);

        const first = data.primero?.connect?.[0]?.id;
        const second = data.segundo?.connect?.[0]?.id;
        const dessert = data.postre?.connect?.[0]?.id;
        const menuType = data.tipo_menu?.connect?.[0]?.id;

        if (!first && !second && !dessert && !menuType) {
            return;
        }
        
        await validarPlatos(data);

        const { addition, total } = await menuService.calcularPrecio({
            primeroID: first,
            segundoID: second,
            postreID: dessert,
            tipoMenuID: menuType
        });

        if (addition !== 0 && total !== 0) {
            data.sum_precio = addition;
            data.precio = total;
        }
    },

    async beforeUpdate(event) {
        const { data, where } = event.params;
        const { ApplicationError } = require('@strapi/utils').errors;
        
        const menuActual = await strapi.documents(DOCUMENT_TYPES.MENU_DIARIO_MODEL).findFirst({
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
            const servicio = strapi.service(DOCUMENT_TYPES.MENU_DIARIO_CUSTOM_SERVICE);
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