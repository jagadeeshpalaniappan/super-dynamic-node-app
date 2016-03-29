(function () {
    'use strict';

    angular
        .module('dynamicmoduledata')
        .controller('DynamicModuleDataListController', DynamicModuleDataListController);

    DynamicModuleDataListController.$inject = ['DynamicModulesDataService', '$stateParams'];

    function DynamicModuleDataListController(DynamicModulesDataService, $stateParams) {
        var vm = this;
        vm.isHttpResolved = false;
        vm.isArray = angular.isArray;

        vm.dynamicModule = {};
        vm.dynamicModuleDatas = [];

        //Fetch Form Feilds By Key
        vm.formFieldLabels = {};


        //Zero Version
        DynamicModulesDataService.query($stateParams.dynamicModuleId).success(function(data){
            vm.dynamicModule = data.dynamicModule;
            vm.dynamicModuleDatas = data.dynamicModuleDatas;

            _fetchFormFieldsLabelByKey(vm.dynamicModule.formFieldsFormly, vm.dynamicModuleDatas);

            //Resolved:
            vm.isHttpResolved = true;
        });




        var _fetchFormFieldsLabelByKey = function(module, data){

            angular.forEach(module, function(moduleElement){
                vm.formFieldLabels[moduleElement.key] = moduleElement.templateOptions.label;
            });

        };

    }
})();
