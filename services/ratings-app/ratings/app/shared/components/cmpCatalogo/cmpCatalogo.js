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
                case 'Country':
                    return 'cmp-country-table';

                case 'User':
                    return 'cmp-user-table';

                case 'Store':
                    return 'cmp-store-table';

                case 'Rating':
                    return 'cmp-rating-table';

                //Opción por defecto para todos los catálogos
                default:
                    return 'cmp-catalogo-columnas';
            }
        };

        function obtenerSubComponenteFormulario()
        {
            switch(vm.nombreRecurso) 
            {
                case 'Country':
                    return 'cmp-country-form';

                case 'User':
                    return 'cmp-user-form';

                case 'Store':
                    return 'cmp-store-form';

                case 'Rating':
                    return 'cmp-rating-form';

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

            if (type == 'Store')
            {
                vm.tableComponentConstruction.transformData.columns.push({ property: "idCountry", type: 'entity', display: 'name', resource: new EntifixResource('Country'), outProperty: '$country' });
                vm.tableComponentConstruction.transformData.columns.push({ property: "idCity", type: 'entity', display: 'name', resource: new EntifixResource('City'), outProperty: '$city' });                
            }

            if (type == 'Rating')
            {
                vm.tableComponentConstruction.transformData.columns.push({ property: "idUser", type: 'entity', display: 'userName', resource: new EntifixResource('User'), outProperty: '$user' });
                vm.tableComponentConstruction.transformData.columns.push({ property: "idStore", type: 'entity', display: 'name', resource: new EntifixResource('Store'), outProperty: '$store' });                
                vm.tableComponentConstruction.transformData.columns.push({ property: "idPurchase", type: 'entity', display: 'documentNumber', resource: new EntifixResource('Purchase'), outProperty: '$purchase' });                
            
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
                bindings:       [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ],
                transformData:  { columns: [    { property: "created", type: 'datetime' },
                                                { property: "modified", type: 'datetime' }  ]   }
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