'use strict';

angular.module('dynamicmodule')
    .controller('DynamicModuleCreateController', ['formlyVersion', 'getOIMConfig', '$scope', '$builder', '$validator', '$timeout', '$location', 'dynamicModuleResolve','$state',
        function MainCtrl(formlyVersion, getOIMConfig, $scope, $builder, $validator, $timeout, $location, dynamicModule,$state) {


            var vm = this;

            vm.dynamicModule = dynamicModule;

            //console.log(vm.dynamicModule);

            vm.active = 0;


            var inProcess = false;



            vm.onClickSaveFormTab = function () {
                vm.dynamicModule.formFieldsFormly = getOIMConfig.getOIMConfig(vm.formFieldsFbBuilder["default"], $builder.forms);
            }

            //Save New Dynamic Module

            vm.saveDynamicModule = save;


             function save() {
                alert("save new module");

                console.log(vm.dynamicModule);


                //vm.dynamicModule.formFieldsFormly = getOIMConfig.getOIMConfig(vm.formFieldsFbBuilder["default"], $builder.forms);
                //vm.dynamicModule.formFieldsFbBuilder = vm.formFieldsFbBuilder;

                console.log(vm.dynamicModule);


                if (vm.dynamicModule._id) {
                    console.log('UPDATE');
                    vm.dynamicModule.$update(successCallback, errorCallback);
                } else {
                    console.log('CREATE');
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


            }





            // Remove existing Article
            vm.remove = function () {
                if (confirm('Are you sure you want to delete?')) {
                    vm.dynamicModule.$remove($state.go('dynamicmodule.list'));
                }
            }





            var loadFormData = function(formsTmp) {

                if(formsTmp){

                    var forms = formsTmp[0];

                    angular.forEach(forms, function(form, formName, obj) {
                        //clear out existing form components
                        clearForm(formName);
                        angular.forEach(form, function(component) {
                            $builder.insertFormObject(formName, component.index, component);
                        });
                    });

                }

            }




            var clearForm = function(formName) {
                if ($builder.forms[formName])
                    $builder.forms[formName].length = 0;
                // existForm.length = 0;
                //angular.forEach(existForm, function (component) {
                //    $builder.removeFormObject(formName, 0);
                //});

            };







            var init = function () {

                //clear all forms first for back navigation button
                //$builder.forms = {};
                vm.formFieldsFbBuilder = $builder.forms;

                //Loading Form Builder -with Existing Data
                loadFormData(vm.dynamicModule.formFieldsFbBuilder);

            }


            init();


            vm.showMyModel = function(){

                console.log("dddddddd");
                console.log(vm.dynamicModule);

            };


        }]);
