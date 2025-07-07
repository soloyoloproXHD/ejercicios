export default {
    async beforeCreate(event){
        const { data } = event.params;

        const menuService = strapi.service('api::menu-diario.menu-service');

        await validarPlatos(data);

        const primero = data.primero?.connect?.[0]?.id;
        const segundo = data.segundo?.connect?.[0]?.id;
        const postre = data.postre?.connect?.[0]?.id;
        const tipoMenu = data.tipo_menu?.connect?.[0]?.id;

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
        await validarPlatos(event.params.data);
    }
}

async function validarPlatos(data: any) {
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
        throw new Error("No se pueden repetir los platos en diferentes categorias.");
    }
}
