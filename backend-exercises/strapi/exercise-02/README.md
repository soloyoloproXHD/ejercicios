## Ejercicio 2: Estructuras en Stapi

Objetivo: Crear una estructura en Strapi que permita gestionar clases, profesores y eventos de manera más detallada, utilizando componentes anidados y relaciones complejas.

### Colección de Eventos:

- Cada evento debe tener un título único, una descripción, y un componente anidado para detalles adicionales (por ejemplo, fecha, hora, lugar, etc.).
- Debe ser posible asignar profesores a cada evento, y cada evento puede tener múltiples profesores asignados.
- Debe ser posible añadir temas al evento, y cada tema puede tener múltiples subtemas.
- Debe ser posible añadir materiales de estudio al evento, y cada material puede tener un tipo específico (por ejemplo, video, documento, etc.).

### Colección de Clases:

- Cada clase debe tener un título único, una descripción, una fecha de inicio, y un componente anidado para detalles adicionales (por ejemplo, horario, aula, etc.).
- Debe ser posible asignar profesores a cada clase, y cada clase puede tener múltiples profesores asignados.
- Colección de Profesores:
- Cada profesor debe tener un nombre, un apellido, un correo electrónico, y un componente anidado para detalles adicionales (por ejemplo, especialidad, experiencia, etc.).
- Un profesor puede estar asignado a múltiples clases, y cada clase puede tener múltiples profesores asignados.
