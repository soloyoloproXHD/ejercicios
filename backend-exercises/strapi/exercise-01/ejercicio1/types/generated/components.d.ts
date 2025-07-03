import type { Schema, Struct } from '@strapi/strapi';

export interface EscuelaContenidoEnriquecido extends Struct.ComponentSchema {
  collectionName: 'components_escuela_contenido_enriquecidos';
  info: {
    displayName: 'ContenidoEnriquecido';
  };
  attributes: {
    contenido: Schema.Attribute.RichText;
  };
}

export interface EscuelaDetallesAdicionales extends Struct.ComponentSchema {
  collectionName: 'components_escuela_detalles_adicionales';
  info: {
    displayName: 'DetallesAdicionales';
    icon: 'bulletList';
  };
  attributes: {
    fecha: Schema.Attribute.Date & Schema.Attribute.Required;
    hora: Schema.Attribute.Time & Schema.Attribute.Required;
    lugar: Schema.Attribute.String & Schema.Attribute.Required;
    num_participantes: Schema.Attribute.Integer;
  };
}

export interface EscuelaDetallesAdicionalesClase
  extends Struct.ComponentSchema {
  collectionName: 'components_escuela_detalles_adicionales_clases';
  info: {
    displayName: 'DetallesAdicionalesClase';
    icon: 'stack';
  };
  attributes: {
    aula: Schema.Attribute.String;
    horario: Schema.Attribute.String;
  };
}

export interface EscuelaDetallesAdicionalesProfesor
  extends Struct.ComponentSchema {
  collectionName: 'components_escuela_detalles_adicionales_profesors';
  info: {
    displayName: 'DetallesAdicionalesProfesor';
    icon: 'doctor';
  };
  attributes: {
    especialidad: Schema.Attribute.String;
    experiencia: Schema.Attribute.Text;
  };
}

export interface EscuelaDomicilio extends Struct.ComponentSchema {
  collectionName: 'components_escuela_domicilios';
  info: {
    displayName: 'Domicilio';
    icon: 'train';
  };
  attributes: {
    calle: Schema.Attribute.String;
    colonia: Schema.Attribute.String;
    entidad: Schema.Attribute.String;
    numero_exterior: Schema.Attribute.Integer;
    pais: Schema.Attribute.String;
  };
}

export interface EscuelaGaleriaDeImagenes extends Struct.ComponentSchema {
  collectionName: 'components_escuela_galeria_de_imagenes';
  info: {
    displayName: 'GaleriaDeImagenes';
    icon: 'dashboard';
  };
  attributes: {
    archivos: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface EscuelaListaDeEnlaces extends Struct.ComponentSchema {
  collectionName: 'components_escuela_lista_de_enlaces';
  info: {
    displayName: 'ListaDeEnlaces';
  };
  attributes: {
    titulo: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface EscuelaMaterial extends Struct.ComponentSchema {
  collectionName: 'components_escuela_materials';
  info: {
    displayName: 'Material';
    icon: 'archive';
  };
  attributes: {
    archivo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    descripcion: Schema.Attribute.Text;
    tipo: Schema.Attribute.Enumeration<['Video', 'Documento']>;
    titulo: Schema.Attribute.String;
  };
}

export interface EscuelaSubTema extends Struct.ComponentSchema {
  collectionName: 'components_escuela_sub_temas';
  info: {
    displayName: 'SubTema';
    icon: 'arrowDown';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    titulo: Schema.Attribute.String;
  };
}

export interface EscuelaTema extends Struct.ComponentSchema {
  collectionName: 'components_escuela_temas';
  info: {
    displayName: 'Tema';
    icon: 'arrowRight';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    subtema: Schema.Attribute.Component<'escuela.sub-tema', true>;
    titulo: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'escuela.contenido-enriquecido': EscuelaContenidoEnriquecido;
      'escuela.detalles-adicionales': EscuelaDetallesAdicionales;
      'escuela.detalles-adicionales-clase': EscuelaDetallesAdicionalesClase;
      'escuela.detalles-adicionales-profesor': EscuelaDetallesAdicionalesProfesor;
      'escuela.domicilio': EscuelaDomicilio;
      'escuela.galeria-de-imagenes': EscuelaGaleriaDeImagenes;
      'escuela.lista-de-enlaces': EscuelaListaDeEnlaces;
      'escuela.material': EscuelaMaterial;
      'escuela.sub-tema': EscuelaSubTema;
      'escuela.tema': EscuelaTema;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
