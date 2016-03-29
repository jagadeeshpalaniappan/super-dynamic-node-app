(function () {
    'use strict';

    angular
        .module('dynamicmodule.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dynamicmodule', {
                abstract: true,
                url: '/dynamicmodule',
                template: '<ui-view/>'
            })
            .state('dynamicmodule.list', {
                url: '',
                templateUrl: 'modules/dynamicmodule/client/views/list-dynamicmodules.client.view.html',
                controller: 'DynamicModuleListController',
                controllerAs: 'vm'
            })
            .state('dynamicmodule.create', {
                url: '/create',
                templateUrl: 'modules/dynamicmodule/client/views/dynamicmodule.client.view.html',
                controller: 'DynamicModuleCreateController',
                controllerAs: 'vm',
                resolve: {
                    dynamicModuleResolve: newDynamicModule
                }
            })
            .state('dynamicmodule.edit', {
                url: '/:dynamicModuleId/edit',
                templateUrl: 'modules/dynamicmodule/client/views/dynamicmodule.client.view.html',
                controller: 'DynamicModuleCreateController',
                controllerAs: 'vm',
                resolve: {
                    dynamicModuleResolve: getDynamicModule
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Article {{ articleResolve.title }}'
                }
            })
            .state('dynamicmodule.view', {
                url: '/:dynamicModuleId',
                templateUrl: 'modules/dynamicmodule/client/views/view-dynamicmodule.client.view.html',
                controller: 'DynamicModuleCreateController',
                controllerAs: 'vm',
                resolve: {
                    dynamicModuleResolve: getDynamicModule
                }
            });


    }


    //RESOLVE-HELPER-METHODS:

    getDynamicModule.$inject = ['$stateParams', 'DynamicModulesService'];

    function getDynamicModule($stateParams, DynamicModulesService) {
        return DynamicModulesService.get({
            dynamicModuleId: $stateParams.dynamicModuleId
        }).$promise;
    }

    newDynamicModule.$inject = ['DynamicModulesService'];

    function newDynamicModule(DynamicModulesService) {
        return new DynamicModulesService();
    }


})();
