# Ejercicio 7

## Parte 1: Contador Automático de Clases

Cada vez que se asigne un profesor a una clase, el número de clases que imparte deberá incrementarse automáticamente. Si se elimina una asignación, el número de clases debe decrementarse.

## Parte 2: Servicio Personalizado para Asignar Profesores con Validaciones

En lugar de depender de la API predeterminada, crearemos un servicio personalizado para asignar profesores a una clase y validar:

- Que el profesor no tenga más de 5 clases activas (límite personalizable).
- Que la clase no tenga más de 3 profesores asignados.
- Si la asignación es exitosa, se enviará una notificación automática.

## Parte 3: API Personalizada para Asignar Profesores

- Ahora crearemos un endpoint en el controlador para llamar al servicio anterior.
