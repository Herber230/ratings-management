(function() {
    'use strict';

    componentController.$inject = ['EntifixResource', 'EntifixSession'];

    function componentController(EntifixResource, EntifixSession)
    {
        var vm = this;

        vm.$onInit = function()
        {
            setdefaults();
            activate();
        };

        // Init Methods
        // ==============================================================================================================================================================

        function setdefaults()
        {

        };

        function activate()
        {
            configurarComponentes();
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================


        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        function obtenerSubComponenteTabla()
        {
            switch(vm.nombreRecurso) 
            {
                case 'class':
                    return 'cmp-class-columnas';

                case 'Country':
                    return 'cmp-country-table';

                case 'User':
                    return 'cmp-user-table';

                case 'Store':
                    return 'cmp-store-table';

                //Opción por defecto para todos los catálogos
                default:
                    return 'cmp-catalogo-columnas';
            }
        };

        function obtenerSubComponenteFormulario()
        {
            switch(vm.nombreRecurso) 
            {
                case 'class':
                    return 'cmp-class-campos';

                case 'Country':
                    return 'cmp-country-form';

                case 'User':
                    return 'cmp-user-form';

                case 'Store':
                    return 'cmp-store-form';

                //Opción por defecto para todos los catálogos
                default:
                    return 'cmp-catalogo-campos';
            }
        };

        function validarPreferencias()
        {
            var type = vm.nombreRecurso;

            if (type == 'class')
            {
                vm.componentConstruction.paramName = '_id';
                //vm.entityComponentConstruction.allowActions = false;
            }
        }
        

        // ==============================================================================================================================================================



        // Components config
        // ==============================================================================================================================================================

        function configurarComponentes()
        {
            vm.componentConstruction =
            {
                title: { text: vm.titulo },
                icon: vm.icono
            };

            vm.queryDetails = 
            {
                resource: new EntifixResource(vm.nombreRecurso)
            };

            vm.tableComponentConstruction = 
            {
                name:       obtenerSubComponenteTabla(),
                bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ],
                transformData:  { columns: [ 
                                            { property: "fechaRegistrado", type: 'datetime' },
                                            { property: "fechaActualizado", type: 'datetime' }
                                           ]
                                }
            };

            vm.entityComponentConstruction = 
            {
                name:       obtenerSubComponenteFormulario(),
                bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ]
            };

            validarPreferencias();
        };
        
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpCatalogo/cmpCatalogo.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          nombreRecurso: '@',
          titulo: '@',
          icono: '@',
          preferencias: '@'
        }
    };

    //Register component
    angular.module(appMainModule).component('cmpCatalogo', component);

})();