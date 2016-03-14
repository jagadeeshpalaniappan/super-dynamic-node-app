'use strict';



angular.module('jtheme').factory('JThemeUtilService', ['$window', '$document', '$rootScope',function($window, $document, $rootScope){

  var getElement = function(selector){

    // return angular.element(document.querySelector(selector));
    return angular.element(document.querySelector(selector));

  };


  return {

    fixMyAppWidthHeight: function(){

      //console.log('fixMyAppWidthHeight');

      var header_height = getElement('.main-header')[0]? getElement('.main-header')[0].offsetHeight : 0;
      var footer_height = getElement('.main-footer')[0]? getElement('.main-footer')[0].offsetHeight : 0;

      var neg = header_height + footer_height;
      var window_height = $window.innerHeight;
      var sidebar_height = getElement('.sidebar')[0]? getElement('.sidebar')[0].offsetHeight : 0;


      var postSetWidth;

      // console.log(neg+'---'+window_height+'---'+sidebar_height);



      if (window_height >= sidebar_height) {
        postSetWidth = window_height - neg;
      } else {
        postSetWidth = sidebar_height;
      }


      //Fix for the control sidebar height
      var controlSidebar = getElement('.control-sidebar')[0];


      if (typeof controlSidebar !== 'undefined') {
        if (controlSidebar.offsetHeight > postSetWidth){
          postSetWidth = controlSidebar.offsetHeight;
        }
      }


      $rootScope.appMinHeight = postSetWidth+'px';


      //console.log(postSetWidth +'---'+ $rootScope.appMinHeight);

      // console.log($rootScope.appMinHeight);
      return postSetWidth+'px';
    },

    //Enable sidebar toggle
    toggleSideMenu : function (e) {

      e.preventDefault();
      // alert('sidebar clicked');
      // console.log($window.innerWidth);


      // var toggleBtn = '[data-toggle='offcanvas']';

      //Get the screen sizes
      var screenSizes = {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
      };


      //Enable sidebar push menu
      if ($window.innerWidth > (screenSizes.sm - 1)) {

        if (getElement('body').hasClass('sidebar-collapse')) {
          getElement('body').removeClass('sidebar-collapse');

          //.trigger('expanded.pushMenu');
        } else {
          getElement('body').addClass('sidebar-collapse');
          // .trigger('collapsed.pushMenu');
        }
      }
      //Handle sidebar push menu for small screens
      else {
        if (getElement('body').hasClass('sidebar-open')) {
          getElement('body').removeClass('sidebar-open');
          getElement('body').removeClass('sidebar-collapse');
          //.trigger('collapsed.pushMenu');
        } else {
          getElement('body').addClass('sidebar-open');
          // $('body').addClass('sidebar-open').trigger('expanded.pushMenu');
        }
      }


    }

  };
}]);


