'use strict';

angular.module('dynamicmodule')
    .controller('DynamicModuleCreateController', ['$scope', 'dynamicModuleResolve', '$state', '$stateParams', 'DynamicModulesUtil','$injector',
        function MainCtrl($scope, dynamicModule, $state, $stateParams, DynamicModulesUtil, $injector) {


            var vm = this;
            vm.dynamicModule = {};
            vm.active = 0;


            vm.loadTab3 = function () {
                vm.dynamicModule.formFieldsFormly = DynamicModulesUtil.getFormFieldsInFormlyFormat(vm.formFieldsFbBuilder["default"]);
            };

            //CREATE / UPDATE -Dynamic Module
            vm.save = function () {


                //Commnted -since we r loading -onlick of tab-3 itself
                vm.dynamicModule.formFieldsFormly = DynamicModulesUtil.getFormFieldsInFormlyFormat(vm.formFieldsFbBuilder["default"]);
                vm.dynamicModule.formFieldsFbBuilder = vm.formFieldsFbBuilder;


                if (vm.dynamicModule._id) {
                    //UPDATE
                    vm.dynamicModule.$update(successCallback, errorCallback);
                } else {
                    //CREATE
                    vm.dynamicModule.$save(successCallback, errorCallback);
                }


                function successCallback(res) {
                    $state.go('dynamicmodule.view', {
                        dynamicModuleId: res._id
                    });

                    $injector.get('$rootScope').$broadcast('refreshDynamicModules');
                }

                function errorCallback(res) {
                    vm.error = res.data.message;
                    console.log(res);
                }


            };


            // Remove existing Article
            vm.remove = function () {
                if (confirm('Are you sure you want to delete?')) {
                    vm.dynamicModule.$remove($state.go('dynamicmodule.list'));
                }
            };


            var init = function () {


                if ($stateParams.dynamicModuleId) {

                    //View / Edit

                    dynamicModule.$promise.then(function (data) {
                        vm.dynamicModule = dynamicModule;

                        //FORM INITIALIZATION
                        vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();

                        //LOADING FORM BUILDER -WITH EXISTING DATA
                        DynamicModulesUtil.loadFormWithData(vm.dynamicModule.formFieldsFbBuilder);


                    });


                } else {

                    //CREATE
                    vm.dynamicModule = dynamicModule;


                    //FORM INITIALIZATION
                    vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();

                    //RESET FORM CACHE
                    DynamicModulesUtil.clearForms(vm.formFieldsFbBuilder);


                }


            };


            init();




        }]);
