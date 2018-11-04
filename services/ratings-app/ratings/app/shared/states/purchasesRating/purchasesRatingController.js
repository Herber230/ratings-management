(function(){
    'use strict';

    angular.module(appMainModule).controller('PurchasesRatingController', controller);

    controller.$inject = ['EntifixResource'];

    function controller(EntifixResource)
    {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //Loaded purchases

        vm.loadedPurchases;
        vm.createState = false;

        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================

        function init()
        {
            setComponents();  
        };

        vm.onChangeUser = function(oldValue, newValue, entity)
        {
            vm.idUserSelected = newValue;

            if (newValue)
                loadPurchases(newValue);
            else
                clearPurchases();
        }
        
        vm.toggleView = function()
        {
            vm.createState = !vm.createState;
        }

        vm.getToggleText = function()
        {
            if (vm.createState)
                return 'Ver compras';
            else
                return 'Registrar nueva compra';
        }

        vm.onSavedNewPurchase= function()
        {
            vm.createState = false;
            loadPurchases( )
        }

        function loadPurchases ( )
        {
            vm.purchasesResource.getCollection( 
                results => vm.loadedPurchases = results,
                () => clearPurchases(),
                [{ property: 'idUser', value: vm.idUserSelected, type: 'fixed_filter' }]);
        }

        function clearPurchases()
        {
            vm.loadedPurchases = [];
        }



        function setComponents()
        {
            vm.purchasesResource = new EntifixResource("Purchase");

            vm.userQueryDetails =
            {
                resource: new EntifixResource('User')
            };

            vm.userComponentConstruction =
            {
                title: { text: 'Usuario' },
                tooltip: { text: 'Elige usuario para filtrar las compras' },
                displayPropertyName: 'completeName'
            };
        }



        //====================================================================================================================================================================


        //Call constructor
        init();
    };

})();