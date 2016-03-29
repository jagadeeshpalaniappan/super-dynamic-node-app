'use strict';

angular.module('dynamicmodule').controller('DynamicModuleCreateController0', ['$scope', 'DynamicModulesService', '$state', '$stateParams', 'DynamicModulesUtil',
    function MainCtrl($scope, DynamicModulesService, $state, $stateParams, DynamicModulesUtil) {


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
                DynamicModulesService.update(vm.dynamicModule).success(successCallback).error(errorCallback);
            } else {
                //CREATE
                DynamicModulesService.create(vm.dynamicModule).success(successCallback).error(errorCallback);
            }


            function successCallback(res) {
                $state.go('dynamicmodule.view', {
                    dynamicModuleId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
                console.log(res);
            }


        };


        // Remove existing Article
        vm.remove = function () {
            if (confirm('Are you sure you want to delete?')) {
                DynamicModulesService.delete(vm.dynamicModule._id).success(function () {
                    $state.go('dynamicmodule.list');
                });
            }
        };


        var init = function () {


            if ($stateParams.dynamicModuleId) {

                //View / Edit

                DynamicModulesService.get($stateParams.dynamicModuleId).success(function (data) {
                    vm.dynamicModule = data;

                    //FORM INITIALIZATION
                    vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();

                    //LOADING FORM BUILDER -WITH EXISTING DATA
                    DynamicModulesUtil.loadFormWithData(vm.dynamicModule.formFieldsFbBuilder);


                });


            } else {

                //CREATE

                //FORM INITIALIZATION
                vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();

                //RESET FORM CACHE
                DynamicModulesUtil.clearForms(vm.formFieldsFbBuilder);


            }


        };


        init();


    }]);
