export default {
    routes: [
        {
            method: 'GET',
            path: '/profesores/:nombre/eventos',
            handler: 'profesor.getEventosByNombre',
            auth: {
                scope: []
            }
        }
    ]
};