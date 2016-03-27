(function () {
  'use strict';

  angular
    .module('dynamicmodule')
    .controller('DynamicModuleListController', DynamicModuleListController);

  DynamicModuleListController.$inject = ['DynamicModulesService'];

  function DynamicModuleListController(DynamicModulesService) {
    var vm = this;

    vm.dynamicModules = [];

    //Get All
    vm.dynamicModules = DynamicModulesService.query();

    //Zero Version
    /*
    DynamicModulesService.query().success(function(data){
      vm.dynamicModules = data;
    });
    */
    console.log(vm.dynamicModules);
  }
})();
