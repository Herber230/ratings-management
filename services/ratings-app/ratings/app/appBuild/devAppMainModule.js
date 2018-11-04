//APLICATION MAIN ENTRY FUNCTION
//Función autollamada que sirve para declarar el módulo principal y los módulos de los que depende para arrancar.
//Dentro de ésta función existen dos funciones más llamadas configApp y runApp, que sirven para configurar el despliegue de la aplicación y las primeras acciones luego de ser desplegada respectivamente.
(function()
{

    //MAIN MODULE CREATION
    //Se escribe el nombre del módulo, seguidamente una colección de dependencias. A ésto se le denomina Inyección de Dependencias.
    var app = angular.module(appMainModule, [   'angular-jwt',
                                                'ui.router',
                                                'ngAnimate', 
                                                'oc.lazyLoad',
                                                'ngMessages',
                                                'ngMaterial',
                                                'app.config',
                                                'ngMaterialSidemenu',
                                                'pagination',
                                                'ngMaterialDatePicker',
                                                'entifix-js'              ]);

    //SET CONFIGURATION AND RUN FUNTCIONS
    app.config(configApp).run(runApp);


    //CONFIGURATION FUNCTION _____________________________________________________________________________________________________________________________________________ 
    //====================================================================================================================================================================
    configApp.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$ocLazyLoadProvider', 'APP_REQUIRES', 'RouteHelpersProvider', 'AppRedirects', 'jwtOptionsProvider', 'EntifixSessionProvider', 'AppResources', 'DevOptions', '$mdThemingProvider', 'EntifixResourceMetadataProvider'];

    function configApp($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, APP_REQUIRES, helper, AppRedirects, jwtOptionsProvider, EntifixSessionProvider, AppResources, DevOptions, $mdThemingProvider, EntifixResourceMetadataProvider) 
    {   
        //Lazy Loading Configuration =====================================================================================================================================
        //Carga lenta o Lazy Loading, sirve para hacer carga de scripts conforme son solicitados, en lugar de ser cargados todos al inicio. 
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

        //Configuración de autenticación ===================================================================================================================================
        //Interceptor de peticiones y configuracion de validacion del token.
        //A cada petición que se realiza, se usa el módulo angular-jwt para agregar un header que contiene el token almacenado en memoria.

        jwtOptionsProvider.config({
                                    tokenGetter: ['options', 
                                                    function(options) 
                                                    {
                                                        // Skip authentication for any requests ending in .html
                                                        if (options && options.url.substr(options.url.length - 5) == '.html') 
                                                        {
                                                            return null;
                                                        }
                                                    
                                                        // Token from the local storage
                                                        var t = localStorage.getItem('authToken');

                                                        return t; 
                                                    }],

                                    //List for CORS Domains
                                    whiteListedDomains: [AppResources.whiteListedDomains],

                                    //Login path
                                    // unauthenticatedRedirector: ['$state', function($state) 
                                    //                             {
                                    //                                 $state.go('app.home');
                                    //                             }]

                                    });

        $httpProvider.interceptors.push('jwtInterceptor');

        //$mdThemingProvider.theme('default')
        //    .dark();
        //    .primaryPalette('pink')
        //    .accentPalette('orange');

        $mdThemingProvider.definePalette('entifixPalette', {
            '50': 'ffffff',
            '100': '1a8cff',
            '200': 'eeeeea',
            '300': '000000',
            '400': 'ffffff',
            '500': '1a8cff',
            '600': '262626',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light

            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('entifixPalette')
            .accentPalette('blue')
            .warnPalette('red');


        //Routes =========================================================================================================================================================
        //Definición de Rutas para los Estados que tenga la app. Por cada estado se debe definir de manera requerida:
        //name:         nombre del state, lleva una estructura de árbol, iniciando usalmente por app, y seguido del nombre del estado actual.
        //title:        título del estado.
        //url:          dirección para encontrar el estado, esta es independiente a la dirección física del mismo (en el server) por ejemplo http://miapp.com/app/miestado se puede
        //              encontrar físicamente en \\app\shared\states\miestado\miestado.html. Es decir que la forma de asignar rutas no depende de la estructura física del directorio.
        //templateUrl:  dirección física para encontrar el template (html) del estado.
        //controller:   nombre que se define para el controllador, usualmente llevará el nombre del state seguido de la palabra Controller.
        //controllerAs: sobrenombre para el controlador, usualmente será vm.
        //resolve:      listado de dependencias (CSS o JS (Modules, Services, Factories, Constants)) que necesitan estar cargados para el estado.
        //abstract:     bool que sirve para indicar si puede ser un estado final o solo un estado que requerira subestados.

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/app/home');
        
        $stateProvider            
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('/views/app.html'),
                controller: 'appController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('whirl', 'datetimepicker', 'history'),
                data: { requiresLoginDev: true }
            })
            .state('app.noAuth', {
                url: '/no-autorizado',
                template: '<entifix-no-authorized></entifix-no-authorized>'
            })
            .state('app.home', {
                url: '/home',
                title: 'Inicio',
                templateUrl: helper.basepath('/shared/states/home/home.html'),
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('HomeCtrl'),
                data: { displayRoute: ['Inicio'] }
            })
            .state('app.class', {
                url: '/class?_id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Class',
                template: '<cmp-catalogo nombre-recurso="class" titulo="Class" icono="description"></cmp-catalogo>',
                resolve: helper.resolveFor('CmpCatalogo', 'ClassCtrl'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Catálogos', 'Class'] }
            })
            .state('app.country', {
                url: '/country?id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Paises',
                template: '<cmp-catalogo nombre-recurso="Country" titulo="Pais" icono="description"></cmp-catalogo>',
                resolve: helper.resolveFor('CmpCatalogo', 'CountryFiles', 'CityFiles'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Catálogos', 'Region'] }
            })
            .state('app.user', {
                url: '/user?id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Usuarios',
                template: '<cmp-catalogo nombre-recurso="User" titulo="Usuario" icono="description"></cmp-catalogo>',
                resolve: helper.resolveFor('CmpCatalogo', 'UserFiles'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Catálogos', 'Usuarios'] }
            })
            .state('app.store', {
                url: '/store?id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Tiendas',
                template: '<cmp-catalogo nombre-recurso="Store" titulo="Tienda" icono="description"></cmp-catalogo>',
                resolve: helper.resolveFor('CmpCatalogo', 'StoreFiles'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Catálogos', 'Tiendas'] }
            })
            .state('app.ratingsReview', {
                url: '/ratings-review?id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Revision Opiniones',
                template: '<cmp-catalogo nombre-recurso="Rating" titulo="Opiniones" icono="description"></cmp-catalogo>',
                resolve: helper.resolveFor('CmpCatalogo', 'RatingFiles'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Operador', 'Opiniones'] }
            })
            .state('app.purchasesRating', {
                url: '/purchases-rating?id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Calificar mis compras',
                templateUrl: helper.basepath('/shared/states/purchasesRating/purchasesRating.html'),
                controller: 'PurchasesRatingController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('CmpCatalogo', 'PurchasesRatingFiles'),
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true, dynamic: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Usuario', 'Calificar mis compras'] }
            });




        //Security management
        EntifixSessionProvider.setAuthUrl(AppResources.authUrl);
        EntifixSessionProvider.setUnauthorizedStateName('app.noAuth');
        EntifixSessionProvider.setAuthTokenName('authToken');
        EntifixSessionProvider.setDevMode(true);
        EntifixSessionProvider.setRedirectName('appRedirect');
        EntifixSessionProvider.setAuthName('appAuth');
        EntifixSessionProvider.setThisApplication(AppRedirects.this);
        EntifixSessionProvider.setAuthApplication(AppRedirects.login);
        EntifixSessionProvider.setDevUser({
            user: '',
            password: ''
        });

        //Metadata management
        EntifixResourceMetadataProvider.setMainAPI(AppResources.mainAPI);
    };



    //RUN FUNCTION _______________________________________________________________________________________________________________________________________________________ 
    //====================================================================================================================================================================
    runApp.$inject = ['authManager', '$rootScope', '$location', 'EntifixSession', 'DevOptions', '$window', 'EntifixResourceMetadata'];
    
    function runApp(authManager, $rootScope, $location, EntifixSession, DevOptions, $window, EntifixResourceMetadata)
    {
        //Configuraciones para  el comportamiento de la autenticación
        //Keep the session on refreshing
        authManager.checkAuthOnRefresh();
        //authManager.redirectWhenUnauthenticated();
        
        $rootScope.$on('tokenHasExpired', function() 
        {
            // Action for token expired...
            if (DevOptions.autoLogin)
                EntifixSession.tryLoginAsDeveloper();
            else
            {
                EntifixSession.redirect.set(EntifixSession.thisApplication.get());
                EntifixSession.authApp.set(EntifixSession.authUrl.get());
                $window.location.href = EntifixSession.authApplication.get();
            }
        });
        
        $rootScope.$on('$stateChangeStart', EntifixSession.checkNavigation );
        
        if (DevOptions.autoLogin && !EntifixSession.currentUser.get())
            EntifixSession.tryLoginAsDeveloper();

        EntifixResourceMetadata.loadMetadata();
    };
    //====================================================================================================================================================================
    



    //CONSTANTS __________________________________________________________________________________________________________________________________________________________ 
    //====================================================================================================================================================================
        
    //Constante que es usada para definir, los scripts y módulos que podrán ser cargados en el resolveFor de las Rutas para poder realizar el Lazy Loading.
    //Es posible crear grupos de scripts. Se creará una entrada por cada controlador, el cual será cargado como necesario en su respectiva ruta.
    //Podrán cargarse además de js, css. 
    //Otra manera de agrupar es por módulos, los cuales serán cargados con un nombre y una colección de archivos.
    
    app.constant('APP_REQUIRES', {
        scripts: {
            //CSS ========================================================================================================================================================
            'whirl':                                ['vendor/whirl/whirl.min.css'],

            //Controllers / Components for Views ======================================================================================================================================
            'HomeCtrl':                             ['app/shared/states/home/homeController.js'],
            'ClassCtrl':                            ['app/shared/components/cmpClassColumnas/cmpClassColumnas.js',
                                                     'app/shared/components/cmpClassCampos/cmpClassCampos.js'],
            
            'CountryFiles':                         ['app/shared/components/cmpCountry/cmpCountryForm.js',
                                                     'app/shared/components/cmpCountry/cmpCountryTable.js'],
            
            'CityFiles':                            ['app/shared/components/cmpCity/cmpCityForm.js',
                                                     'app/shared/components/cmpCity/cmpCityTable.js'],

            'UserFiles':                            ['app/shared/components/cmpUser/cmpUserForm.js',
                                                     'app/shared/components/cmpUser/cmpUserTable.js'],
            
            'StoreFiles':                           ['app/shared/components/cmpStore/cmpStoreForm.js',
                                                     'app/shared/components/cmpStore/cmpStoreTable.js'],    
                                                     
            'RatingFiles':                          ['app/shared/components/cmpRating/cmpRatingForm.js',
                                                     'app/shared/components/cmpRating/cmpRatingTable.js'],

            'PurchasesRatingFiles':                 ['app/shared/states/purchasesRating/purchasesRatingController.js',
                                                     'app/shared/components/purchase/purchase.js',
                                                     'app/shared/components/purchase/cmpPurchaseForm.js'],

            //Single Components ==========================================================================================================================================
            'CmpCatalogo':                          ['app/shared/components/cmpCatalogo/cmpCatalogo.js',
                                                     'app/shared/components/cmpCatalogoColumnas/cmpCatalogoColumnas.js',
                                                     'app/shared/components/cmpCatalogoCampos/cmpCatalogoCampos.js'],
            
            //Directives =================================================================================================================================================
            'history':                              'app/js/directives/history/history.js',
            //JavaScript Utils ===========================================================================================================================================
            
            //Services ======================================================================================================================================
 
        },

        //Modules ========================================================================================================================================================
        modules: [
            {name: 'datetimepicker',            files: ['vendor/ng-material-datetimepicker/material-datetimepicker.min.css']},

            {name: 'entifix-js',            files: [
                                                        'vendor/entifix-js/css/entifix-js.css',
                                                        'vendor/entifix-js/entifix-js.js',
                                                        'vendor/entifix-js/js/services/entifixmetadata.js',
                                                        'vendor/entifix-js/js/services/entifixresource.js',
                                                        'vendor/entifix-js/js/services/entifixnotification.js',
                                                        'vendor/entifix-js/js/services/entifixpager.js',
                                                        'vendor/entifix-js/js/services/entifixcollectionformatter.js',
                                                        'vendor/entifix-js/js/services/entifixcollectionformatter.js',
                                                        'vendor/entifix-js/js/services/entifixerrormanager.js',
                                                        'vendor/entifix-js/js/directives/entifixElasticTextArea.js',
                                                        'vendor/entifix-js/js/directives/entifixNextFocus.js',
                                                        'vendor/entifix-js/js/directives/entifixNumberValidation.js',
                                                        'vendor/entifix-js/js/directives/entifixFileRead.js',
                                                        'vendor/entifix-js/js/directives/entifixsecuritycontext.js',
                                                        'vendor/entifix-js/shared/controls/entifixentitymodal/entifixentitymodal.js',
                                                        'vendor/entifix-js/shared/components/entifixCatalog/entifixCatalog.js',
                                                        'vendor/entifix-js/shared/components/entifixTable/entifixTable.js',
                                                        'vendor/entifix-js/shared/components/entifixEntityForm/entifixEntityForm.js',
                                                        'vendor/entifix-js/shared/components/entifixInput/entifixInput.js',
                                                        'vendor/entifix-js/shared/components/entifixSelect/entifixSelect.js',
                                                        'vendor/entifix-js/shared/components/entifixAutocomplete/entifixAutocomplete.js',
                                                        'vendor/entifix-js/shared/components/entifixRadioButton/entifixRadioButton.js',
                                                        'vendor/entifix-js/shared/components/entifixDateTimePicker/entifixDateTimePicker.js',
                                                        'vendor/entifix-js/shared/components/entifixCheckboxSwitch/entifixCheckboxSwitch.js',
                                                        'vendor/entifix-js/shared/components/entifixChip/entifixChip.js',
                                                        'vendor/entifix-js/shared/components/entifixPreconditionFailedError/entifixPreconditionFailedError.js'
                                                    ]},
        ]
    });

    //====================================================================================================================================================================
        

    //====================================================================================================================================================================
    //Configuración básica del LazyLoading (no es necesario modificar).
    app.provider('RouteHelpers', RouteHelpersProvider);

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) 
    {
        return {
            // provider access level
            basepath: basepath,
            resolveFor: resolveFor,
            // controller access level
            $get: function() 
            {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        // Set here the base of the relative path
        // for all app js or css to load
        function basepath(uri) 
        {
            return 'app/' + uri;
        }

        // Generates a resolve object by passing script names
        // previously configured in constant APP_REQUIRES
        function resolveFor() 
        {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad','$q', function ($ocLL, $q) 
                {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for(var i=0, len=_args.length; i < len; i ++)
                    {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) 
                    {
                        // also support a function that returns a promise
                        if(typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                        return promise.then(function() 
                        {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            // finally, return a promise
                            return $ocLL.load( whatToLoad );
                        });
                    }
                    
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) 
                    {
                        if (APP_REQUIRES.modules)
                            for(var m in APP_REQUIRES.modules)
                                if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                                    return APP_REQUIRES.modules[m];
                        return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
                    }

                }]
            };
        }
    };
    //====================================================================================================================================================================
        

})();