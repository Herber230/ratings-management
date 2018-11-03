// Main/App controller
(function(){
    'use strict';

    // Un controlador debe estar definido para un módulo en específico, por lo que se comúnmente se usara appMainModule, al menos que tengamos más modularización. La manera 
    // en que declararemos un controlador es definiendo una función controller donde estará toda le estructura del controlador, y ésta sera usada para su declaración.
    // Comunmente en los ejemplos(en internet) encontramos que el controlador es definido en la declaración del mismo y no por aparte, sin embargo para fines de orden y 
    // entendimiento encontraremos este modo de uso en la mayoría de elementos, con una declaración de la función fuera del registro del controllador correspondiente.
    angular
        .module(appMainModule)
        .controller('appController', controller);

    // $inject nos sirve para inyectar elementos, los cuales pueden ser servicios, factorias, providers, valores, y constantes.
    controller.$inject = ['$state', 'EntifixSession', '$mdSidenav', '$mdMedia', '$mdDialog', 'EntifixErrorManager', '$timeout'];

    //Declaración de la función
    function controller($state, EntifixSession, $mdSidenav, $mdMedia, $mdDialog, EntifixErrorManager, $timeout)
    {
        // Como parte de buenas prácticas, renombraremos al scope del controlador como vm, por lo que cualquier elemento ligado al mismo siempre será precedido de la palabra vm.
        // Esto lo encontraremos en cada controlador
        var vm = this;
        
        // Función que siempre se ejecuta al iniciar el controlador. Si se desea hacer algo al construir el estado como una configuración por defecto, la misma puede
        // ser colocada en esta función.
        function activate()
        {
            
            
        };

        //NAVBAR ELEMENTS ________________________________________________________________________________________________________________________________________________ 
        //================================================================================================================================================================
        
        // Colección de objetos que sirve para armar la Barra de Navegación del Sitio Web. Cada objeto contiene un nombre, un icono, un estado o una función que se ejecuta
        // al hacer click sobre el objeto. Adiconalmente puede tener una colección de subItems que se collapsarán o expanderán apartir del item padre.
        vm.navbarElements = [
            {
                name: "Inicio",
                icon: "home",
                click: () => { $state.go('app.home'); },
                state: "app.home"
            },
            {
                name: "Catalogos",
                icon: "folder",
                submenuItems: [
                    {
                        name: "Class",
                        state: "app.class({id:null})"
                    },
                    {
                        name: "Ubicaciones",
                        state: "app.country({id:null})"
                    },
                    {
                        name: "Usuarios",
                        state: "app.user({id:null})"
                    },
                    {
                        name: "Tiendas",
                        state: "app.store({id:null})"
                    }
                ]
            },
            {
                name: "Menú 2",
                icon: "store mall directory",
                submenuItems: [
                    {
                        name: "Submenú 2",
                        state: "app.submenu2({id:null})"
                    },
                    {
                        name: "Submenú 3",
                        state: "app.submenu3({id:null})"
                    }
                ]
            }
        ];

        // Function that invokes the click attribute if exists on the items in the left navigation sidebar
        vm.clickElement = function(element)
        {
            if (element && element.click)
                element.click();
        };

        // Function that closes current Session, remove token and redirects to the app login
        vm.LogOut = function()
        {
            EntifixSession.authToken.remove();
            vm.nameCurrentUser = null;                      
        };

        // Function that sets the display navigation route on the top navigation bar
        vm.getNavigationRoute = function()
        {
            if ($state && $state.current)
                return $state.current.data.displayRoute;
        }

        // Listener that sets the title attribute at the top of the browser tab and close the current open dialogs
        var listener = function(event, toState, toParams, fromState, fromParams)
        {
            var title = projectName;
            if (toState.title)
            {
                var stateTitle = toState.title; 
                if(stateTitle != '')
                    title = stateTitle + ' | ' + title;
            }
            // Set asynchronously so page changes before title does
            $timeout(function() {
                var title_el = document.querySelector("title");
                if(title_el)
                    title_el.innerHTML = title;
                document.title = title;
            });

            // If exists the class md-dialog-is-showing in the body tag, close all dialogs when the state change
            if (angular.element(document.body).hasClass('md-dialog-is-showing'))
                $mdDialog.hide();
        };

        // If the screen size is medium or greater than medium, the sidebar is fixed on the contrary is not fixed
        ($mdMedia('gt-md')) ? vm.fixedSideBar = true : vm.fixedSideBar = false;

        // Function that open the sidebar on the left
        vm.openSideNavPanel = () => { $mdSidenav('left').open(); };

        // Function that close the sidebar on the left and change the fixed attribute
        vm.closeSideNavPanel = () => { $mdSidenav('left').close(); vm.fixedSideBar = !vm.fixedSideBar; };

        // Function that fixed the sidebar on the left
        vm.setSideBar = () => { vm.fixedSideBar = !vm.fixedSideBar; }

        // Function that redirect to the home state
        vm.goToHome = () => { $state.go("app.home"); };

        // Function that open the user menu at right on the top bar
        vm.openUserMenu = ($mdMenu, ev) => { $mdMenu.open(ev); }

        // Function that invoke the modal for choose the current workgroup
        vm.openBodegaMenu = () => { EntifixErrorManager.preconditionFailedError(); }
        
        // Function to eval the current Permissions.
        vm.evalPermissions = function(element)
        {
            if (element.securityContext)
                return EntifixSession.checkPermissions(element.securityContext)
            else
                return true;
        }

        // Project Configurations. Name Project and Powered By.
        vm.projectName = projectName;
        vm.poweredBy = poweredBy;
        
        activate();
    };

})();