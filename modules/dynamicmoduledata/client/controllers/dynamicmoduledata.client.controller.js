'use strict';

angular.module('dynamicmodule')
    .controller('DynamicModuleDataController', ['$scope', 'dynamicModuleResolve', '$state', '$stateParams', 'DynamicModulesUtil',
        function MainCtrl($scope, dynamicModule, $state, $stateParams, DynamicModulesUtil) {


            var vm = this;
            vm.dynamicModule = {};
            vm.dynamicModuleModel = {};


            vm.active = 0;


            vm.loadTab3 = function () {
                vm.dynamicModule.formFieldsFormly = DynamicModulesUtil.getFormFieldsInFormlyFormat(vm.formFieldsFbBuilder["default"]);
            };

            //CREATE / UPDATE -Dynamic Module
            vm.save = function () {


                alert("save");

                console.log(vm.dynamicModuleModel);

/*


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
                }

                function errorCallback(res) {
                    vm.error = res.data.message;
                    console.log(res);
                }
*/


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



                        //Load DynamicModule -DATA

                        vm.dynamicModuleModel = {"default-textInput-5948":"jagadeesh","default-textArea-8926":"pppp"};

                    });


                }

            };


            init();


        }]);
