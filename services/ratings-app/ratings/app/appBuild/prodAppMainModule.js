(function()
{
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

    app.config(configApp).run(runApp);

    configApp.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$ocLazyLoadProvider', 'APP_REQUIRES', 'RouteHelpersProvider', 'AppRedirects', 'jwtOptionsProvider', 'EntifixSessionProvider', 'AppResources', '$mdThemingProvider'];

    function configApp($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider, APP_REQUIRES, helper, AppRedirects, jwtOptionsProvider, EntifixSessionProvider, AppResources, $mdThemingProvider) 
    {   
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

        jwtOptionsProvider.config({
                                    tokenGetter: ['options', 
                                                    function(options) 
                                                    {
                                                        if (options && options.url.substr(options.url.length - 5) == '.html') 
                                                        {
                                                            return null;
                                                        }
                                                    
                                                        var t = localStorage.getItem('authToken');

                                                        return t; 
                                                    }],

                                    whiteListedDomains: [AppResources.whiteListedDomains],

                                    // unauthenticatedRedirector: ['$state', function($state) 
                                    //                             {
                                    //                                 $state.go('app.home');
                                    //                             }]

                                    });

        $httpProvider.interceptors.push('jwtInterceptor');

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
            'contrastDefaultColor': 'light',    
            'contrastDarkColors': ['50', '100', 
            '200', '300', '400', 'A100'],
            'contrastLightColors': undefined  
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('entifixPalette')
            .accentPalette('blue')
            .warnPalette('red');

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/app/home');
        
        $stateProvider            
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('/views/app.html'),
                controller: 'appController',
                controllerAs: 'vm',
                resolve: helper.resolveFor('whirl', 'datetimepicker', 'entifix-production'),
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
                data: { displayRoute: ['Inicio'] }
            })
            .state('app.class', {
                url: '/class?_id&searchText&page&itemsPerPage&chips&customSearch&nav',
                title: 'Class',
                template: '<cmp-catalogo nombre-recurso="class" titulo="Class" icono="description"></cmp-catalogo>',
                params: { itemsPerPage: { value: '10', squash: true }, page: { value: '1', squash: true }, searchText: { value: null, squash: true }, chips: { value: null, squash: true }, customSearch: { value: null, squash: true } },
                data: { displayRoute: ['Catálogos', 'Class'] }
            });

        EntifixSessionProvider.setAuthUrl(AppResources.authUrl);
        EntifixSessionProvider.setUnauthorizedStateName('app.noAuth');
        EntifixSessionProvider.setAuthTokenName('authToken');
        EntifixSessionProvider.setRedirectName('appRedirect');
        EntifixSessionProvider.setAuthName('appAuth');
        EntifixSessionProvider.setThisApplication(AppRedirects.this);
        EntifixSessionProvider.setAuthApplication(AppRedirects.login);
    };

    runApp.$inject = ['authManager', '$rootScope', '$location', 'EntifixSession', '$window'];
    
    function runApp(authManager, $rootScope, $location, EntifixSession, $window)
    {
        authManager.checkAuthOnRefresh();
        
        $rootScope.$on('tokenHasExpired', function() 
        {
            EntifixSession.redirect.set(EntifixSession.thisApplication.get());
            EntifixSession.authApp.set(EntifixSession.authUrl.get());
            $window.location.href = EntifixSession.authApplication.get();
        });
        
        $rootScope.$on('$stateChangeStart', EntifixSession.checkNavigation );
    };
    //====================================================================================================================================================================
    
    app.constant('APP_REQUIRES', {
        scripts: {
            'whirl':                                [serviceName+'vendor/whirl/whirl.min.css'],
            'entifix-production':                   [serviceName+'app/js/project-app.min.js']
        },

        modules: [
            {name: 'datetimepicker',            files: [serviceName+'vendor/ng-material-datetimepicker/material-datetimepicker.min.css']}
        ]
    });

    //====================================================================================================================================================================
        

    //====================================================================================================================================================================
    app.provider('RouteHelpers', RouteHelpersProvider);

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) 
    {
        return {
            basepath: basepath,
            resolveFor: resolveFor,
            $get: function() 
            {
                return {
                    basepath: basepath,
                    resolveFor: resolveFor
                };
            }
        };

        function basepath(uri) 
        {
            return 'app/' + uri;
        }

        function resolveFor() 
        {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad','$q', function ($ocLL, $q) 
                {
                    var promise = $q.when(1);
                    for(var i=0, len=_args.length; i < len; i ++)
                    {
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    function andThen(_arg) 
                    {
                        if(typeof _arg === 'function')
                            return promise.then(_arg);
                        else
                        return promise.then(function() 
                        {
                            var whatToLoad = getRequired(_arg);
                            if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            return $ocLL.load( whatToLoad );
                        });
                    }
                    
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