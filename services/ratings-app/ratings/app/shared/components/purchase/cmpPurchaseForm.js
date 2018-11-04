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
            vm.ratingResource = new EntifixResource('Rating');
        };

        function activate()
        {
            setupComponents();
        };

        // ==============================================================================================================================================================



        // Methods
        // ==============================================================================================================================================================

        vm.getEditableRating = function()
        {
            return true;
        }

        vm.showRating = function()
        {
            if (vm.connectionComponent && vm.connectionComponent.entity && vm.connectionComponent.entity.id)
            {
                return vm.connectionComponent.entity.id.length > 4;
            }   
            else 
                return false;  
        }

        vm.saveRating = function()
        {
            vm.rating.idPurchase = vm.connectionComponent.entity.id;
            vm.ratingResource.saveEntity(vm.rating);
        }



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
                displayPropertyName: 'completeName'
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


            vm.scoreComponentConstruction = 
            {
                title: { text: 'Puntuacion' },
                type: 'number',
                min: 0,
                max: 5,
                tooltip: { text: 'puntuacion de la compra' }
            };

            vm.opinionComponentConstruction = 
            {
                title: { text: 'Opinion' },
                maxLength: 500,
                isTextArea: true,
                rows: 2,
                tooltip: { text: 'opinion de la compra' }
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