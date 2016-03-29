(function () {
    'use strict';

    angular
        .module('dynamicmoduledata.services')
        .factory('DynamicModulesDataService', DynamicModulesDataService);

    DynamicModulesDataService.$inject = ['$resource', '$http'];

    function DynamicModulesDataService($resource, $http) {

/*
        var dynamicModulesRestApi = $resource('api/dynamicmodulesdata/:dynamicModuleId', {
            dynamicModuleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

         return dynamicModulesRestApi;
*/



        var urlBase = 'api/dynamicmodulesdata';
        var dynamicModulesRestApi = {};

        dynamicModulesRestApi.query = function (dynamicModuleId) {
            console.log(dynamicModuleId);
            return $http.get(urlBase + '/' + dynamicModuleId);
        };

        dynamicModulesRestApi.get = function (dynamicModuleId, id) {
            return $http.get(urlBase + '/' + dynamicModuleId + '/' + id);
        };

        dynamicModulesRestApi.create = function (dynamicModuleId, obj) {
            return $http.post(urlBase + '/' + dynamicModuleId, obj);
        };

        dynamicModulesRestApi.update = function (dynamicModuleId, obj) {
            return $http.put(urlBase + '/' + dynamicModuleId + '/' + obj._id, obj);
        };

        dynamicModulesRestApi.delete = function (dynamicModuleId, id) {
            return $http.delete(urlBase + '/' + dynamicModuleId + '/' + id);
        };


        return dynamicModulesRestApi;



    }
})();
