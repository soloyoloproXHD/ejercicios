export default {
    routes: [
        {
            method: 'GET',
            path: '/platos/populares',
            handler: 'plato-controller.getPlatosPopulares',
            config: {
                auth: false
            }
        }
    ]
}