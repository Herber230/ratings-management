
(function() {
    'use strict';

    componentController.$inject = ['EntifixResource', '$timeout'];

    function componentController(EntifixResource, $timeout)
    {
        var vm = this;

        vm.$onInit = function()
        {
            setComponents();
            activate();
        };

        // Init Properties
        // ==============================================================================================================================================================

        vm.titleGetter = ()=>{
            if (vm.title)
                return vm.title;
            else
                'Compra'
        }

        // ==============================================================================================================================================================


        // Init Methods
        // ==============================================================================================================================================================

        function activate()
        {
            var initForm = () =>
            {
                if (vm.purchaseEntityComponentBindingOut)
                {
                    vm.resource.loadAsResource( vm.id, 
                        entity => {
                            vm.title = 'Compra #'+entity.number;
                            vm.purchaseEntityComponentBindingOut.entity.set(entity);
                            vm.purchaseEntityComponentBindingOut.showEditableFields.set(false);
                        }
                    );
                }
                else
                {
                    $timeout(initForm, 100);
                }
            };

            initForm();
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================



        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        function setComponents()
        {
            vm.resource = new EntifixResource('Purchase');

            vm.purchaseQueryDetails = 
            {
                resource: vm.resource
            };
            
            vm.purchaseComponentConstruction = 
            {
                title: { getter: vm.titleGetter  },
                name:       'cmp-purchase-form',
                bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ]
            };

        }

        

        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/purchase/purchase.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          id: '<'
        }
    };

    //Register component
    angular.module(appMainModule).component('purchase', component);

})();