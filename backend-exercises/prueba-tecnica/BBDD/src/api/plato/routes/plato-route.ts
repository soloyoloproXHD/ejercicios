export default {
    routes: [
        {
            method: 'GET',
            path: '/platos/ranking',
            handler: 'plato-controller.getPlatosPopulares',
            config: {
                auth: false
            }
        }
    ]
}