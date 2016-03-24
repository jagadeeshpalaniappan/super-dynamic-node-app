(function () {
  'use strict';

  angular
    .module('dynamicmodule')
    .controller('DynamicModuleListController', DynamicModuleListController);

  DynamicModuleListController.$inject = ['DynamicModulesService'];

  function DynamicModuleListController(DynamicModulesService) {
    var vm = this;

    vm.dynamicModules = DynamicModulesService.query();

    console.log(vm.dynamicModules);
  }
})();
