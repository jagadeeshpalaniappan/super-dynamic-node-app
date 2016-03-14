'use strict';


angular.module('jtheme').directive('windowResizeTrigger',function($window, $parse) {
  var directiveDefinitionObject = {
    restrict: 'A',
    scope: { method:'&windowResizeTrigger' },
    link: function(scope,element,attrs) {

      //console.log('windowResizeTrigger');

      var triggerFn = scope.method();

      if(typeof triggerFn === 'function'){

        scope.width = $window.innerWidth;

        angular.element($window).bind('resize', function(){

          scope.width = $window.innerWidth;

          // manuall $digest required as resize event
          // is outside of angular
          scope.$digest();

          //calling the custom event function
          triggerFn();

        });

      }




    }
  };
  return directiveDefinitionObject;
});




angular.module('jtheme').directive('jSidebarMenu', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      menuItems: '='
    },
    //templateUrl: 'modules/core/client/views/home.client.view.html'
    templateUrl: function(elem, scope) {
      return 'modules/jlib/client/views/jsidebar.client.view.html';
    },
    controller: ['$scope', function($scope) {

      $scope.currentState = '';
      $scope.currentSubState = '';

      $scope.selectMenu = function(state){
        $scope.currentState = state;
      };

      $scope.selectSubMenu = function(state){
        $scope.currentSubState = state;
      };

      var item, _i, _len, _ref, _ref1;
      _ref = $scope.menuItems;

       //console.log('--');
       //console.log($scope.menuItems);

      if(_ref){

        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          //item.hasSubmenu = (item.submenu !== null) && ((_ref1 = item.submenu) !== null ? _ref1.length : void 0) > 0;
          item.hasSubmenu = item.submenu? true : false;
          item.expanded = false;
          item.hasBadge = item.badge? true : false;


          if(_i === 1){
            $scope.currentState = item.state;
          }
        }

      }


      //return console.log($scope.menuItems);
    }]
  };
});
