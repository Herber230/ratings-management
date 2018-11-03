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

        };

        function activate()
        {
            createComponents();
        };

        // ==============================================================================================================================================================



        // Properties & fields
        // ==============================================================================================================================================================



        // ==============================================================================================================================================================
 


        // Methods
        // ==============================================================================================================================================================

        function createComponents()
        {
            vm.nombreComponentConstruction = 
            {
                title: { text: 'Nombre' },
                isRequired: true,
                maxLength: 300,
                tooltip: { text: 'Nombre' }
            };

            vm.valorComponentConstruction = 
            {
                title: { text: 'Código o Valor' },
                maxLength: 100,
                tooltip: { text: 'Código o Valor' }
            };

            vm.observacionesComponentConstruction = 
            {
                title: { text: 'Observaciones' },
                maxLength: 500,
                isTextArea: true,
                rows: 2,
                tooltip: { text: 'Observaciones' }
            };

            vm.fechaRegistradoComponentConstruction =
            {
                title: { text: 'Fecha de Registro' },
                isDisabled: true,
                tooltip: { text: 'Fecha de Registro' }
            };

            vm.registradoPorComponentConstruction = 
            {
                title: { text: 'Registrado Por' },
                tooltip: { text: 'Registrado Por' }
            };

            vm.fechaActualizadoComponentConstruction =
            {
                title: { text: 'Fecha de Actualización' },
                isDisabled: true,
                tooltip: { text: 'Fecha de Actualización' },
            };

            vm.actualizadoPorComponentConstruction = 
            {
                title: { text: 'Actualizado Por' },
                tooltip: { text: 'Actualizado Por' }
            };
        }
        // ==============================================================================================================================================================

    };

    var component = 
    {
        templateUrl: 'app/shared/components/cmpCatalogoCampos/cmpCatalogoCampos.html',
        controller: componentController,
        controllerAs: 'vm',
        bindings: 
        { 
          connectionComponent: '='
        }
    };

    //Register component
    angular.module(appMainModule).component('cmpCatalogoCampos', component);

})();