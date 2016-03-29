(function () {
    'use strict';

    angular.module('dynamicmodule.services').factory('DynamicModulesService0', DynamicModulesService);

    DynamicModulesService.$inject = ['$resource', '$http'];

    function DynamicModulesService($resource, $http) {

        var urlBase = 'api/dynamicmodules';
        var dynamicModulesRestApi = {};

        dynamicModulesRestApi.query = function () {
            return $http.get(urlBase);
        };

        dynamicModulesRestApi.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        dynamicModulesRestApi.create = function (obj) {
            return $http.post(urlBase, obj);
        };

        dynamicModulesRestApi.update = function (obj) {
            return $http.put(urlBase + '/' + obj._id, obj);
        };

        dynamicModulesRestApi.delete = function (id) {
            return $http.delete(urlBase + '/' + id);
        };


        return dynamicModulesRestApi;


    }
})();
