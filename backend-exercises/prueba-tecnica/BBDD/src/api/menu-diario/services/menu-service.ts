import { Core } from '@strapi/strapi';
import type { PriceParams, PriceResults } from '../../../type/menu-types';
import { ERROR_MESSAGES, DOCUMENT_TYPES, FIELDS } from '../../../consts/document-types';
import { Total } from '../../../utils/operations';

export default ({strapi}: {strapi: Core.Strapi}) => ({
    async calculatePrice(params: PriceParams): Promise<PriceResults> {
        const { ApplicationError } = require('@strapi/utils').errors;
        const { firstID, secondID, dessertID, menuTypeID } = params;
        let addition = 0;

        if (firstID && secondID && dessertID && menuTypeID) {
            const ids = [firstID, secondID, dessertID].filter(Boolean) as number[];
            const validIds = ids.filter((id): id is number => !!id);

            await Promise.all(validIds.map(async id => {
                const dish = await strapi.documents(DOCUMENT_TYPES.DISH_MODEL).findFirst({
                    filters: { id },
                    fields: [FIELDS.PRICE]
                });
                if (dish && typeof dish[FIELDS.PRICE] === 'number') {
                    addition += dish[FIELDS.PRICE];
                }
            }));
            
            const menuType = await strapi.documents(DOCUMENT_TYPES.MENU_TYPE_MODEL).findFirst({
                filters: { id: menuTypeID },
                fields: [FIELDS.TAX]
            });


            var total = Total(addition, menuType[FIELDS.TAX]);

            return {
                addition,
                total
            };
        }
        throw new ApplicationError(ERROR_MESSAGES.MISSING_DISH_OR_MENU);
    }
});