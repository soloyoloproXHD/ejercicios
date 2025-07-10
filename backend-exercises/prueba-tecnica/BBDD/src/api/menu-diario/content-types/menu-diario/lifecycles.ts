import { DOCUMENT_TYPES, ERROR_MESSAGES, FIELDS  } from "../../../../consts/document-types";
import { MenuDiarioLifecycle } from "../../../../type/menu-types";

export default {
    async beforeCreate(event){
        const { data } = event.params;

        const service = strapi.service(DOCUMENT_TYPES.MENU_DIARIO_CUSTOM_SERVICE);

        const first = data.primero?.connect?.[0]?.id;
        const second = data.segundo?.connect?.[0]?.id;
        const dessert = data.postre?.connect?.[0]?.id;
        const menuType = data.tipo_menu?.connect?.[0]?.id;

        if (!data.documentId){
            await validateDishes(data);
            
            const { addition, total } = await service.calculatePrice({
                firstID: first,
                secondID: second,
                dessertID: dessert,
                menuTypeID: menuType
            });

            if (addition !== 0 && total !== 0) {
                data.sum_precio = addition;
                data.precio = total;
            }
            return;
        }
        if (!first && !second && !dessert && !menuType) {
            return;
        }
    },

    async beforeUpdate(event) {
        const { data, where } = event.params;
        const { ApplicationError } = require('@strapi/utils').errors;
        
        const currentMenu = await strapi.documents(DOCUMENT_TYPES.MENU_DIARIO_MODEL).findFirst({
            filters: where,
            populate: [FIELDS.FIRST, FIELDS.SECOND, FIELDS.DESSERT, FIELDS.MENU_TYPE]
        });

        if (!currentMenu) {
            throw new ApplicationError(ERROR_MESSAGES.MENU_NOT_FOUND);
        }
        
        const platosFinales = {
            first: finalDish(currentMenu.primero, data.primero),
            second: finalDish(currentMenu.segundo, data.segundo),
            dessert: finalDish(currentMenu.postre, data.postre)
        };
        
        const ids = Object.values(platosFinales).filter((id): id is number => id !== null);
        const uniqueIds = new Set(ids);
        
        if (uniqueIds.size !== ids.length) {
            throw new ApplicationError(ERROR_MESSAGES.DISH_REPEATED);
        }
        
        const changesInDishes = data.primero || data.segundo || data.postre || data.tipo_menu;

        if (changesInDishes) {
            const service = strapi.service(DOCUMENT_TYPES.MENU_DIARIO_CUSTOM_SERVICE);
            const finalMenuType = data.tipo_menu?.connect?.[0]?.id || currentMenu.tipo_menu?.id;

            const { addition, total } = await service.calculatePrice({
                firstID: platosFinales.first,
                secondID: platosFinales.second,
                dessertID: platosFinales.dessert,
                menuTypeID: finalMenuType
            });

            if (addition !== 0 && total !== 0) {
                data.sum_precio = addition;
                data.precio = total;
            }
        }
    }
}

async function validateDishes(data: MenuDiarioLifecycle) {
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
        throw new ApplicationError(ERROR_MESSAGES.DISH_REPEATED);
    }
}

function finalDish(currentDish: any, changedDish: MenuDiarioLifecycle): number | null {
    if (changedDish?.connect && changedDish.connect.length > 0) {
        return changedDish.connect[0]?.id || null;
    }

    if (changedDish?.disconnect && changedDish.disconnect.length > 0) {
        return null;
    }

    return currentDish?.id || null;
}