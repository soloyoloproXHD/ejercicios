import { config } from "process";

export default {
    routes: [
        {
            method: 'GET',
            path: '/menus/desserts',
            handler: 'custom-menus.getDesserts',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/menus',
            handler: 'custom-menus.getMenusPriceAllergens',
            config: {
                auth: false
            }
        },
    ]
}