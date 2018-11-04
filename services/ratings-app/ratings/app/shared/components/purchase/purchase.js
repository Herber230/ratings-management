
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
                    if (vm.id && vm.id != -1)
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
                        vm.title = 'Nueva compra';

                        let newPuchase = {
                            idUser: vm.idUser
                        }

                        vm.purchaseEntityComponentBindingOut.entity.set(newPuchase);
                        vm.purchaseEntityComponentBindingOut.showEditableFields.set(true);
                    }
                }
                else
                    $timeout(initForm, 100);
                
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

            vm.resource.listenSaved( (args) => {
                if (vm.onSaved)
                    vm.onSaved();
            });

            vm.purchaseQueryDetails = 
            {
                resource: vm.resource
            };
            
            vm.purchaseComponentConstruction = 
            {
                title: { getter: vm.titleGetter  },
                name:       'cmp-purchase-form',
                bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ],
                useDefaults: false,
                defaultValuesAllowed: [ 'save' ],
                save: { text: 'GUARDAR COMPRA' }
            };


        }


//          tabla: search, add, edit, delete
//          entidad: save, edit, ok, delete

        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/purchase/purchase.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          id: '<',
          idUser: '<',
          onSaved: '&'
        }
    };

    //Register component
    angular.module(appMainModule).component('purchase', component);

})();