'use strict';

angular.module('core').controller('HomeController', ['$scope','$rootScope','Authentication','JThemeUtilService',
  function ($scope,$rootScope,Authentication,JThemeUtilService) {

    // This provides Authentication context.
    $scope.authentication = Authentication;



    //Jtheme
    $scope.fixMyAppWidthHeight = JThemeUtilService.fixMyAppWidthHeight;



    //Since we have ng-include, we have to trigger this after html include completes
    $rootScope.$on('$includeContentLoaded', function(event, templateName){
      //console.log("included html loaded..");

      JThemeUtilService.fixMyAppWidthHeight();
    });



    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
      },
      {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    //$scope.fixMyAppWidthHeight();

    //

    //$rootScope.appMinHeight = '816px';
    //console.log($rootScope.appMinHeight);


    //$scope.appMinHeight = $rootScope.appMinHeight;



  }
]);
