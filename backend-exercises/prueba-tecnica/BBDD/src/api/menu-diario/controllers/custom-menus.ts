import { DOCUMENT_TYPES } from "../../../consts/document-types";

export default {
    async getDesserts(ctx) {
        const menus = await strapi.documents(DOCUMENT_TYPES.MENU_DIARIO_MODEL).findMany({
            populate: {
                postre: true,
            }
        });

        const desserts = menus
            .filter(menu => menu.postre)
            .map(menu => ({
                menuID: menu.id,
                postre: {
                    id: menu.postre.id,
                    nombre: menu.postre.nombre,
                    precio: menu.postre.precio,
                },
            }));

        ctx.body = { data: desserts };
    },
    async getMenusPriceAllergens(ctx) {
        try {
            const minimum = parseFloat(ctx.query.min_price) || 0;
            const maximum = parseFloat(ctx.query.max_price) || Number.MAX_SAFE_INTEGER;
            const excluded = (ctx.query.exclude_allergens || '').split(',').filter(Boolean);

            const menus = await strapi.documents(DOCUMENT_TYPES.MENU_DIARIO_MODEL).findMany({
                filters: {
                    precio: {
                        $gte: minimum,
                        $lte: maximum,
                    },
                },
                populate: {
                    primero: {
                        populate: {
                            Alergenos: true,
                        }
                    },
                    segundo: {
                        populate: {
                            Alergenos: true,
                        }
                    },
                    postre: {
                        populate: {
                            Alergenos: true,
                        }
                    },
                    tipo_menu: true,
                }
            });

            const menu = menus
                .filter(menu => menu.primero && menu.segundo && menu.postre && menu.tipo_menu)
                .map(menu => ({
                    id: menu.id,
                    dia: menu.dia,
                    precio: menu.precio,
                    primero: {
                        id: menu.primero.id,
                        nombre: menu.primero.nombre,
                        precio: menu.primero.precio,
                        alergenos: menu.primero.Alergenos,
                    },
                    segundo: {
                        id: menu.segundo.id,
                        nombre: menu.segundo.nombre,
                        precio: menu.segundo.precio,
                        alergenos: menu.segundo.Alergenos,
                    },
                    postre: {
                        id: menu.postre.id,
                        nombre: menu.postre.nombre,
                        precio: menu.postre.precio,
                        alergenos: menu.postre.Alergenos,
                    },
                    tipo_menu: {
                        id: menu.tipo_menu.id,
                        nombre: menu.tipo_menu.nombre,
                    },
                }));

            const filtered = menu.filter(menu => {
                const dishes = [menu.primero, menu.segundo, menu.postre].filter(Boolean);

                for (const dish of dishes) {
                    if (dish.alergenos.some(allergen => excluded.includes(allergen.nombre))) {
                        return false;
                    }
                }
                return true;
            });

            ctx.body = {
                data: filtered.map(m => ({
                    id: m.id,
                    dia: m.dia,
                    precio: m.precio,
                    platos: [{
                        id: m.primero.id,
                        nombre: m.primero.nombre,
                        precio: m.primero.precio,
                        alergenos: m.primero.alergenos.map(a => a.nombre),
                    }, {
                        id: m.segundo.id,
                        nombre: m.segundo.nombre,
                        precio: m.segundo.precio,
                        alergenos: m.segundo.alergenos.map(a => a.nombre),
                    }, {
                        id: m.postre.id,
                        nombre: m.postre.nombre,
                        precio: m.postre.precio,
                        alergenos: m.postre.alergenos.map(a => a.nombre),
                    }].filter(Boolean),
                })),
                meta: { total: filtered.length },
            };
        } catch (error) {
            ctx.throw(500, `Opps error ocurred getting menus..`);
        }
    },

};