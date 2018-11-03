 //GLOBAL CONFIGURATION ________________________________________________________________________________________________________________________________________________________
 //============================================================================================================================================================================

 
//Definición del nombre del módulo principal. En el módulo principal están todos elementos a desarrollar del proyecto. 
var appMainModule = 'entifix-spa';
var projectName = 'Entifix SPA';
var poweredBy = 'Powered By +Tech';
var serviceName = '';

//Creación de un módulo para la configuración de la aplicación mediante constantes
(function(){
    'use strict';

    var appConfig = angular.module('app.config', []);

    //Constante "AppResources" que es usada para definir las direcciones web de los recursos que se consultarán
    appConfig.constant("AppResources", 
                        { 
                            "mainAPI": "http://localhost:8080/",
                            "authUrl": "http://localhost:8080/api/user/login",
                            
                            "api": "api/",
                            "whiteListedDomains": "localhost",
                            "": ""
                        } );

    //Constante "AppRedirects" que es usada para los sitios por defecto a los que se redireccionará la aplicación
    appConfig.constant("AppRedirects", 
                        {
                            "login": "http://localhost:8080/auth/#!/login", // URL de aplicación para autenticación
                            "this": "http://localhost:8080/entifix-spa/#!/app/home" //URL de página de inicio de la aplicación
                        });

    //Constante "AppRedirects" que es usada para los sitios por defecto a los que se redireccionará la aplicación
    appConfig.constant("AppSettings", 
                        { 
                                                       
                        });

    //Custom constants...
    appConfig.constant("DominiosRest",
                        {
                        });

    appConfig.constant("DevOptions",
                        {
                            "autoLogin": true 
                        });
})();

//========================================================================================================================================================================
//========================================================================================================================================================================
//========================================================================================================================================================================


