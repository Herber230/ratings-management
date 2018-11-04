(function() {
    'use strict';

    componentController.$inject = ['EntifixResource', '$stateParams'];

    function componentController(EntifixResource, $stateParams)
    {
        var vm = this;

        vm.$onInit = function()
        {
            activate();
        };

        function activate()
        {
            setupComponents();
            setupTable();
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

        
        function setupTable()
        {
            if ($stateParams.id != '-1') 
            {
                vm.componentConstruction =
                {
                    title: { text: 'Tratamientos' },
                    icon: 'sentiment_satisfied',
                    useMainTab: false,
                    isModal: true
                };

                vm.cityResource = new EntifixResource('City');
                vm.cityResource.urlPostfix.set( { getter: () => { return $stateParams.id + '/city'; } } );
                vm.queryDetails = 
                {
                    resource: vm.cityResource
                };

                // vm.queryDetails.resource.urlPostfix.set( { getter: () => { return $stateParams.id + '/city'; } } );

                vm.tableComponentConstruction = 
                {
                    name:       'cmp-city-table',
                    bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ],
                    transformData:  { columns: [ 
                                                { property: "created", type: 'datetime' },
                                                { property: "modified", type: 'datetime' }
                                                ]
                                    },
                    queryParams:    false
                };

                vm.entityComponentConstruction = 
                {
                    name:       'cmp-city-form',
                    bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ]
                };

                vm.entityQueryDetails = 
                {
                    resource: vm.cityResource
                }
                
                // vm.entityComponentBehavior = 
                // {
                //     events: { onChangeEntity: (oldEntity, newEntity)=> { if (!newEntity.idDisease) newEntity.idDisease = $stateParams.id; } }
                // }
            }
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