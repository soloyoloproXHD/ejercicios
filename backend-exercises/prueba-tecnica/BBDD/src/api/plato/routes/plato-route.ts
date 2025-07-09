export default {
    routes: [
        {
            method: 'GET',
            path: '/dishes/ranking',
            handler: 'plato-controller.getDishesRanked',
            config: {
                auth: false
            }
        }
    ]
}