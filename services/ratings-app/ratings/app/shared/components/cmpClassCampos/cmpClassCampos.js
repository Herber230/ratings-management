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
            if ($stateParams.id)
            {
                
                vm.componentConstruction =
                {
                    title: { text: 'Class' },
                    icon:  'aspect_ratio',
                    useMainTab: false,
                    isModal: true
                };
    
                vm.queryDetails = 
                {
                    resource: new EntifixResource('Class'),
                    sort: [ { property: 'orderby', value: 'nombre;asc' } ]
                };
    
                vm.tableComponentConstruction = 
                {
                    name:           'cmp-class-columnas',
                    bindings:       [ {name: 'connection-component', value: 'bindCtrl.connectionComponent'} ],
                    queryParams:    false,
                    transformData:  { columns: [ 
                                                { property: "fechaRegistrado", type: 'datetime' },
                                                { property: "fechaActualizado", type: 'datetime' }
                                            ]
                                    }
                };
    
                vm.modalComponentConstruction = 
                {
                    name:       'cmp-class-campos',
                    bindings:   [   {name: 'connection-component', value: 'bindCtrl.connectionComponent'}   ],
    
                    title:      { text: 'Class' },
                    icon:       { text: 'flip_to_front' }
                };
            }
        };

        function activate()
        {
            constuirComponentes();
        };

        vm.isEntitySaved = function()
        {
            if (!vm.connectionComponent.showEditableFields.get() && vm.connectionComponent.entity && vm.connectionComponent.entity.id)
                return true;
            return false;
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================

        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        function constuirComponentes()
        {
            vm.nameComponentConstruction = 
            {
                title: { text: 'Nombre' },
                isRequired: true,
                isTextArea: true,
                maxLength: 300,
                tooltip: { text: 'Nombre de la Clase.' }
            };

            vm.projectComponentConstruction = 
            {
                title: { text: 'Id Proyecto' },
                maxLength: 100,
                tooltip: { text: 'Identificador del Proyecto.' }
            };

            vm.createdComponentConstruction =
            {
                title: { text: 'Fecha de Registro' },
                isDisabled: true,
                tooltip: { text: 'Fecha de Registro' }
            };

            vm.idComponentConstruction = 
            {
                title: { text: 'Identificador' },
                tooltip: { text: 'Identificador único de la Clase.' }
            };
        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpClassCampos/cmpClassCampos.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    angular.module(appMainModule).component('cmpClassCampos', component);

})();