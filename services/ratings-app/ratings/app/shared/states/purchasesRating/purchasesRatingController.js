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

        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================

        function init()
        {
            setComponents();  
        };

        vm.onChangeUser = function(oldValue, newValue, entity)
        {
            if (newValue)
                loadPurchases(newValue);
            else
                clearPurchases();
        }
        
        function loadPurchases (idUser)
        {
            vm.purchasesResource.getCollection( 
                results => vm.loadedPurchases = results,
                () => clearPurchases(),
                [{ property: 'idUser', value: 'abcd', type: 'fixed_filter' }]);
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