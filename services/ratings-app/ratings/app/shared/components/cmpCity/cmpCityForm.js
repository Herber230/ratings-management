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
                isRequired: true,
                maxLength: 300,
                tooltip: { text: 'Nombre de la ciudad' }
            };


            vm.zipCodeComponentConstruction = 
            {
                title: { text: 'Código Postal' },
                maxLength: 10,
                tooltip: { text: 'Código postal de la ciudad' }
            };

            
        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpCity/cmpCityForm.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpCityForm', component);

})();