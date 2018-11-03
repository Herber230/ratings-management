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
            
            vm.firstNameComponentConstruction = 
            {
                title: { text: 'Nombres' },
                maxLength: 40,
                tooltip: { text: 'Nombres del usuario' }
            };

            vm.lastNameComponentConstruction = 
            {
                title: { text: 'Apellidos' },
                maxLength: 40,
                tooltip: { text: 'Apellidos del usuario' }
            };

            vm.userNameComponentConstruction = 
            {
                title: { text: 'Usuario' },
                maxLength: 15,
                tooltip: { text: 'Usuario de sesión' }
            };

            vm.emailComponentConstruction = 
            {
                title: { text: 'Correo Electrónico' },
                maxLength: 30,
                tooltip: { text: 'Correo electrónico del usuario' }
            };

        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpUser/cmpUserForm.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpUserForm', component);

})();