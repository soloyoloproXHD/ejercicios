export default {
    async afterUpdate(event) {
        try {
            const { data } = event.params;

            if (data.profesores.connect[0] === undefined) {
                var profesorId = data.profesores.disconnect[0].id;
            }
            if (data.profesores.connect[0] !== undefined) {
                profesorId = data.profesores.connect[0].id;
            }
            
            if (profesorId !== undefined) {
                const profesor = await strapi.documents('api::profesor.profesor').findFirst({
                    filters: { id: profesorId },
                    populate: { clases: {} },
                });

                if (profesor && profesor.clases) {
                    const documentId = profesor.documentId;
                    const count = profesor.clases.length;

                    await strapi.documents('api::profesor.profesor').update({
                        documentId: documentId,
                        data: {
                            nClasesAsignadas: count
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error updating profesor:', error);   
        }
    }
}