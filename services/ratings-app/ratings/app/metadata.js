var globalMetadata =
{
    "resources":
    [
        {
            "name": "usuario"
        },
        {
            "name": "login",
            "base": "Usuario"
        },
        {
            "name": "entity",
            "abstract": "true",
            "definedMembers":   [   { "name": "created", "paginable": "true", "display": "Registrado" },
                                    { "name": "id", "paginable": "true", "display": "Identificador" } ]
        },
        {
            "name": "catalogo",
            "base": "entity",
            "abstract": "true"
        },
        {
            "name": "class",
            "keyProperty": "_id",
            "base": "catalogo",
            "definedMembers":   [   { "name": "name", "paginable": "true", "default": "true", "display": "Nombre" },
                                    { "name": "idProject", "paginable": "true", "default": "true", "display": "Proyecto" } ]
        },

        {
            "name": "Entity",
            "abstract": "true",
            "definedMembers":   [   { "name": "created", "paginable": "true", "default": "false", "display": "Creado" },
                                    { "name": "modified", "paginable": "true", "default": "false", "display": "Modificado" } ]
        },
        {
            "name": "Country",
            "base": "Entity",
            "url": "http://localhost:3000/api/country",
            "definedMembers":   [   { "name": "name", "paginable": "true", "default": "true", "display": "Nombre" },
                                    { "name": "shortName", "paginable": "true", "default": "true", "display": "Nombre Corto" } ]
        },
        {
            "name": "City",
            "base": "Entity",
            "allowUrlPostfix": true,
            "url": "http://localhost:3000/api/country",
            "definedMembers":   [   { "name": "name", "paginable": "true", "default": "true", "display": "Nombre" },
                                    { "name": "zipCode", "paginable": "true", "default": "true", "display": "Codigo Postal" } ]
        },
        {
            "name": "User",
            "base": "Entity",
            "url": "http://localhost:5001/api/user",
            "definedMembers":   [   { "name": "userName", "paginable": "true", "default": "true", "display": "Usuario" },
                                    { "name": "firstName", "paginable": "true", "default": "true", "display": "Nombres" },
                                    { "name": "lastName", "paginable": "true", "default": "true", "display": "Apellidos" },
                                    { "name": "email", "paginable": "true", "default": "true", "display": "Correo" } ]
        },
        {
            "name": "Store",
            "base": "Entity",
            "url": "http://localhost:8090/store",
            "definedMembers":   [   { "name": "name", "paginable": "true", "default": "true", "display": "Nombre" },
                                    { "name": "address", "paginable": "true", "default": "true", "display": "Direccion" },
                                    { "name": "idCity", "paginable": "true", "default": "true", "display": "Ciudad" },
                                    { "name": "idCountry", "paginable": "true", "default": "true", "display": "Pais" },
                                    { "name": "ratingScore", "paginable": "true", "default": "true", "display": "Punt. Total" },
                                    { "name": "ratingCount", "paginable": "true", "default": "true", "display": "Punt. Registradas" } ]
        },
        {
            "name": "Rating",
            "base": "Entity",
            "url": "http://localhost:8080/rating",
            "definedMembers":   [   { "name": "idPurchase", "paginable": "true", "default": "true", "display": "Compra" },
                                    { "name": "idStore", "paginable": "true", "default": "true", "display": "Tienda" },
                                    { "name": "idUser", "paginable": "true", "default": "true", "display": "Usuario" },
                                    { "name": "score", "paginable": "true", "default": "true", "display": "Puntuacion" },
                                    { "name": "opinion", "paginable": "true", "default": "true", "display": "Opinion" } ]
        },
        {
            "name": "Purchase",
            "base": "Entity",
            "url": "http://localhost:5000/api/purchase",
            "definedMembers":   [   { "name": "idUser", "paginable": "true", "default": "true", "display": "Compra" },
                                    { "name": "total", "paginable": "true", "default": "true", "display": "Tinda" },
                                    { "name": "currencySymbol", "paginable": "true", "default": "true", "display": "Usuario" },
                                    { "name": "idStore", "paginable": "true", "default": "true", "display": "Puntuacion" },
                                    { "name": "currencyTotal", "paginable": "true", "default": "true", "display": "Opinion" },
                                    { "name": "number", "paginable": "true", "default": "true", "display": "Numero" } ]
        }
    ]
};