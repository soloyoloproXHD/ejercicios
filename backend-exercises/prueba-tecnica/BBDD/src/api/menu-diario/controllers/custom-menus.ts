export default {
    async getPostres(ctx) {
        const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
            populate: {
                postre: true,
            }
        });

        const postres = menus
            .filter(menu => menu.postre)
            .map(menu => ({
                menuID: menu.id,
                postre: {
                    id: menu.postre.id,
                    nombre: menu.postre.nombre,
                    precio: menu.postre.precio,
                },
            }));

        ctx.body = { data: postres };
    },
    async getMenusPrecioAlergenos(ctx) {
        try {
            const minimo = parseFloat(ctx.query.min_precio) || 0;
            const maximo = parseFloat(ctx.query.max_precio) || Number.MAX_SAFE_INTEGER;
            const excluidos = (ctx.query.excluir_alergenos || '').split(',').filter(Boolean);

            const menus = await strapi.documents('api::menu-diario.menu-diario').findMany({
                filters: {
                    precio: {
                        $gte: minimo,
                        $lte: maximo,
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

            const menu = menus.map(menu => ({
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

            const filtrados = menu.filter(m => {
                const platos = [m.primero, m.segundo, m.postre].filter(Boolean);

                for (const plato of platos) {
                    if (plato.alergenos.some(al => excluidos.includes(al.nombre))) {
                        return false;
                    }
                }
                return true;
            });

            ctx.body = {
                data: filtrados.map(m => ({
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
                meta: { total: filtrados.length }, 
            };
        } catch (error) {
            return;
        }
    },

};