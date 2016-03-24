(function () {
    'use strict';

    angular
        .module('dynamicmodule.services')
        .factory('DynamicModulesService', DynamicModulesService);

    DynamicModulesService.$inject = ['$resource'];

    function DynamicModulesService($resource) {
        return $resource('api/dynamicmodules/:dynamicModuleId', {
            dynamicModuleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
