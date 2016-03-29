(function () {
    'use strict';

    angular
        .module('dynamicmodule.services')
        .factory('DynamicModulesService', DynamicModulesService);

    DynamicModulesService.$inject = ['$resource', '$http'];

    function DynamicModulesService($resource, $http) {

        var dynamicModulesRestApi = $resource('api/dynamicmodules/:dynamicModuleId', {
            dynamicModuleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

         return dynamicModulesRestApi;

    }
})();
