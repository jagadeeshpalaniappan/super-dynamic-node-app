'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','JThemeUtilService','$document', 'DynamicModulesService',
  function ($scope, $state, Authentication, Menus, JThemeUtilService, $document, DynamicModulesService) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Get the account menu
    $scope.accountMenu = Menus.getMenu('account').items[0];

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });


    //Jtheme
    //$scope.fixMyAppWidthHeight = JThemeUtilService.fixMyAppWidthHeight;
    $scope.toggleSideMenu = JThemeUtilService.toggleSideMenu;

    //console.log(document.querySelector('.skin-blue'));
    //console.log(angular.element(document.querySelector('.skin-blue')));


    //console.log($scope.menu);


    $scope.toggleChild = function(item){
      item.expanded = !item.expanded;
    };




    //Get All -Dynamic Modules
    $scope.dynamicModules = DynamicModulesService.query();


  }
]);
