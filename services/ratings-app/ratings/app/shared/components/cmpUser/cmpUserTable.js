(function() {
    'use strict';

    componentController.$inject = [];

    function componentController()
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
            vm.allSelected = false;
        };

        function activate()
        {
            
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================



        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        

        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpUser/cmpUserTable.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    //Register component
    angular.module(appMainModule).component('cmpUserTable', component);

})();