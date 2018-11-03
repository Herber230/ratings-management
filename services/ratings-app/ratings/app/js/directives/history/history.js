(function() {
    'use strict';

    function directive()
    {
        return {
            templateUrl: 'app/js/directives/history/history.html'
        };
    };

    //Register directive
    angular.module(appMainModule).directive('history', directive);

})();