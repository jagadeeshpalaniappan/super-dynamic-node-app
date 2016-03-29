'use strict';

angular.module('dynamicmodule')
    .controller('DynamicModuleDataController', ['$scope', 'dynamicModuleResolve', '$state', '$stateParams', 'DynamicModulesUtil', 'DynamicModulesDataService','DynamicModulesService',
        function MainCtrl($scope, dynamicModule, $state, $stateParams, DynamicModulesUtil, DynamicModulesDataService, DynamicModulesService) {


            var vm = this;
            vm.dynamicModule = {};
            vm.dynamicModuleData = {};
            vm.dynamicModuleData.formData = {};

            vm.dynamicModuleModel = {};


            vm.active = 0;


            vm.loadTab3 = function () {
                vm.dynamicModule.formFieldsFormly = DynamicModulesUtil.getFormFieldsInFormlyFormat(vm.formFieldsFbBuilder["default"]);
            };

            //CREATE / UPDATE -Dynamic Module
            vm.save = function () {


                if (vm.dynamicModuleData._id) {
                    //UPDATE
                    DynamicModulesDataService.update($stateParams.dynamicModuleId, vm.dynamicModuleData).success(successCallback).error(errorCallback);
                } else {
                    //CREATE
                    DynamicModulesDataService.create($stateParams.dynamicModuleId, vm.dynamicModuleData).success(successCallback).error(errorCallback);
                }


                function successCallback(res) {
                    $state.go('dynamicmoduledata.list', { dynamicModuleId: $stateParams.dynamicModuleId });
                }

                function errorCallback(res) {
                    vm.error = res.data.message;
                    console.log(res);
                }


            };


            // Remove existing Article
            vm.remove = function () {
                if (confirm('Are you sure you want to delete?')) {
                    DynamicModulesDataService.delete(vm.dynamicModule._id, vm.dynamicModuleData._id).success(function () {
                        $state.go('dynamicmoduledata.list', {dynamicModuleId:vm.dynamicModule._id});
                    });
                }
            };


            var init = function () {




                if ($stateParams.dynamicModuleDataId) {

                    //View / Edit

                    console.log($stateParams.dynamicModuleId+"----"+ $stateParams.dynamicModuleDataId);

                    DynamicModulesDataService.get($stateParams.dynamicModuleId, $stateParams.dynamicModuleDataId).success(function (data) {
                        vm.dynamicModuleData = data.dynamicModuleData;
                        vm.dynamicModule = data.dynamicModule;

                        //FORM INITIALIZATION
                        vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();

                        //LOADING FORM BUILDER -WITH EXISTING DATA
                        DynamicModulesUtil.loadFormWithData(vm.dynamicModuleData.formFieldsFbBuilder);


                        //vm.dynamicModuleModel = {"default-textInput-5948":"jagadeesh","default-textArea-8926":"pppp"};


                    });


                } else {

                    //CREATE

                    DynamicModulesService.get({ dynamicModuleId: $stateParams.dynamicModuleId }).$promise.then(function (data) {
                        vm.dynamicModule = data;


                        //FORM INITIALIZATION
                        vm.formFieldsFbBuilder = DynamicModulesUtil.initializeFormBuilderData();


                    });



                }



            };


            init();


        }]);
