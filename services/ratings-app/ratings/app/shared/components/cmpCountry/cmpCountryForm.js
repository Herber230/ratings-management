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
                maxLength: 100,
                tooltip: { text: 'Nombre del país' }
            };

            vm.shortNameComponentConstruction = 
            {
                title: { text: 'Nombre Corto' },
                maxLength: 10,
                tooltip: { text: 'Nombre corto para el país' }
            };

        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpCountry/cmpCountryForm.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpCountryForm', component);

})();