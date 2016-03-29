(function () {
    'use strict';

    angular
        .module('dynamicmoduledata')
        .controller('DynamicModuleDataListController', DynamicModuleDataListController);

    DynamicModuleDataListController.$inject = ['DynamicModulesDataService', '$stateParams'];

    function DynamicModuleDataListController(DynamicModulesDataService, $stateParams) {
        var vm = this;
        vm.isHttpResolved = false;

        vm.dynamicModule = {};
        vm.dynamicModuleDatas = [];

        //Get All
        //vm.dynamicModules = DynamicModulesDataService.query();

        //Zero Version
        DynamicModulesDataService.query($stateParams.dynamicModuleId).success(function(data){
            vm.dynamicModule = data.dynamicModule;
            vm.dynamicModuleDatas = data.dynamicModuleDatas;

            //Resolved:
            vm.isHttpResolved = true;
        });


        console.log(vm.dynamicModuleDatas);
    }
})();
