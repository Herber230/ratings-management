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
            
            vm.nameComponentConstruction = 
            {
                title: { text: 'Nombre' },
                maxLength: 40,
                tooltip: { text: 'Nombre de la tienda' }
            };

            vm.addressComponentConstruction = 
            {
                title: { text: 'Dirección' },
                maxLength: 40,
                tooltip: { text: 'Dirección de la tienda' }
            };


            vm.cityQueryDetails =
            {
                resource: new EntifixResource('City')
            };

            vm.cityComponentConstruction =
            {
                title: { text: 'Ciudad' },
                tooltip: { text: 'Elige ciudad' },
                displayPropertyName: 'name'
            };

            vm.countryQueryDetails =
            {
                resource: new EntifixResource('Country')
            };

            vm.countryComponentConstruction =
            {
                title: { text: 'Pais' },
                tooltip: { text: 'Elige pais' },
                displayPropertyName: 'name'
            };

        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpStore/cmpStoreForm.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpStoreForm', component);

})();