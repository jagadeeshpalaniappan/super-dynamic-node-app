'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


    //These 'toState.data.roles' --are configured in each route
    var rolesRequiredToAccessThisState = toState.data? (toState.data.roles? toState.data.roles : 'NO_ROLES_REQUIRED') : 'NO_ROLES_REQUIRED';
    console.log('State: '+toState.name +' --- Roles Required To Access this State: ['+ rolesRequiredToAccessThisState +']');


    //This state requires user must be 'logged in' and must have enough 'permission' to access
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {

      var allowed = false;


      //SUCCESS
      toState.data.roles.forEach(function (role) {

        //Is Logged In User has that role
        if ((role === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1)) {

          //User has 'logged in' && User has that 'role' to access this 'state'
          //Authorization Success
          allowed = true;
          return true;
        }

      });


      //FAILURE
      if (!allowed) {

        event.preventDefault();

        //User has 'logged in' -- But User doesn't have 'role' to access this 'state'
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {

          //This User is not authorized to use this module
          $state.go('forbidden');

        } else {

          //User is not 'logged in'  [This state requires user must be logged in]
          $state.go('authentication.signin').then(function () {
            storePreviousState(toState, toParams);
          });
        }


      }
    }


  });





  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    storePreviousState(fromState, fromParams);
  });



  // Store previous state
  function storePreviousState(state, params) {
    // only store this state if it shouldn't be ignored 
    if (!state.data || !state.data.ignoreState) {
      $state.previous = {
        state: state,
        params: params,
        href: $state.href(state, params)
      };
    }
  }




});




//DOM Ready
//Then define the init function for starting up the application
angular.element(document).ready(function () {


  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }


  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
