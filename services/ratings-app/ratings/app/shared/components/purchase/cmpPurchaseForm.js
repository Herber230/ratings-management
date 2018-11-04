(function() {
    'use strict';

    componentController.$inject = ['EntifixResource', '$stateParams'];

    function componentController(EntifixResource, $stateParams)
    {
        var vm = this;

        vm.$onInit = function()
        {
            setdefaults();
            activate();
        };

        // Init Methods

        function setdefaults()
        {
            
        };

        function activate()
        {
            setupComponents();
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================

        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        function setupComponents()
        {
            
            vm.storeQueryDetails =
            {
                resource: new EntifixResource('Store')
            };

            vm.storeComponentConstruction =
            {
                title: { text: 'Tienda' },
                tooltip: { text: 'Elige la tienda' },
                displayPropertyName: 'name'
            };

            vm.userQueryDetails =
            {
                resource: new EntifixResource('User')
            };

            vm.userComponentConstruction =
            {
                title: { text: 'Usuario' },
                tooltip: { text: 'Elige el usuario' },
                displayPropertyName: 'name'
            };




            vm.currencySymbolComponentConstruction = 
            {
                title: { text: 'Simbolo de moneda' },
                maxLength: 1,
                tooltip: { text: 'Símbolo de la moneda' }
            };

            vm.totalComponentConstruction = 
            {
                title: { text: 'total' },
                maxLength: 40,
                tooltip: { text: 'total' }
            };

        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/purchase/cmpPurchaseForm.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpPurchaseForm', component);

})();