export const DOCUMENT_TYPES = {
    MENU_DIARIO_CUSTOM_SERVICE: 'api::menu-diario.menu-service',
    MENU_DIARIO_CUSTOM_CONTROLLER: 'api::menu-diario.custom-menus',
    MENU_DIARIO_MODEL: 'api::menu-diario.menu-diario',
    MENU_TYPE_MODEL: 'api::tipo-menu.tipo-menu',
    DISH_MODEL: 'api::plato.plato',
    DISH_SERVICE: 'api::plato.plato-service',
    SALE_MODEL: 'api::venta.venta',
} as const;

export const FIELDS = {
    ID: 'id',
    NAME: 'nombre',
    FIRST: 'primero',
    SECOND: 'segundo',
    DESSERT: 'postre',
    MENU_TYPE: 'tipo_menu',
    PRICE: 'precio',
    PRICE_SUM: 'sum_precio',
    TAX: 'impuesto',
} as const;

export const ERROR_MESSAGES = {
    MISSING_DISH_OR_MENU: "Missing dishes or menu type.",
    DISH_REPEATED: "Dishes can't be repeated in different categories.",
    MENU_NOT_FOUND: "Menu not found.",
    INVALID_PRICE: "Invalid dish price.",
} as const;