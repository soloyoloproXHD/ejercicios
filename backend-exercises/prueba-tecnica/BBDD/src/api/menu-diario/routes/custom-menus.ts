import { config } from "process";

export default {
    routes: [
        {
            method: 'GET',
            path: '/menus/postres',
            handler: 'custom-menus.getPostres',
            config: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/menus',
            handler: 'custom-menus.getMenusPrecioAlergenos',
            config: {
                auth: false
            }
        },
    ]
}