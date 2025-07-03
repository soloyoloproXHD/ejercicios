export default {
    routes: [
        {
            method: 'POST',
            path: '/clases/:nombreClase/asignar-profesor/:idProfesor',
            handler: 'clase.asignarProfesor',
            auth: true
        }
    ]
}