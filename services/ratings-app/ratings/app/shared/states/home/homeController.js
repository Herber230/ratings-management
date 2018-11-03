(function(){
    'use strict';

    angular.module(appMainModule).controller('HomeController', controller);

    controller.$inject = [];

    function controller()
    {
        var vm = this;

        // Properties & Fields ===============================================================================================================================================


        //====================================================================================================================================================================



        // Methods ===========================================================================================================================================================

        function init()
        {
            globalMetadata.resources.forEach((e)=>{
                if (e.name == 'class')
                    vm.metadataClass = e;
            });
        };

        //Call constructor
        init();
    };

})();