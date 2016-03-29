'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus','JThemeUtilService','$document', 'DynamicModulesService','$rootScope',
  function ($scope, $state, Authentication, Menus, JThemeUtilService, $document, DynamicModulesService, $rootScope) {
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


    $scope.getClass = function getClass(idx, list) {

      var expression = (idx+1) % 4;
      var cssClass = "";

      switch(expression) {
        case 1:
          cssClass = "bg-aqua";
          break;
        case 2:
          cssClass = "bg-green";
          break;
        case 3:
          cssClass = "bg-yellow";
          break;
        default:
          cssClass = "bg-red";
      }


      //return idx > list.length / 2 - 1;

      return cssClass;

    };


    $rootScope.$on('refreshDynamicModules', function () {
      //refreshDynamicModules -Dynamic Modules
      $scope.dynamicModules = DynamicModulesService.query();
    });

  }
]);
