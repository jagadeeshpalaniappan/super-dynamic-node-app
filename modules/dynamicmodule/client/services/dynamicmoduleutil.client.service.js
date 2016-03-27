(function () {
    'use strict';

    angular
        .module('dynamicmodule.services')
        .factory('DynamicModulesUtil', DynamicModulesUtil);

    DynamicModulesUtil.$inject = ['$builder','getOIMConfig'];

    function DynamicModulesUtil($builder,getOIMConfig) {

       
        var dynamicModulesUtil = {};


        /*
         *
         * Clear out existing form components
         *
         * */
        dynamicModulesUtil.clearForm = function(formName) {
            if ($builder.forms[formName]){
                $builder.forms[formName].length = 0;
            }
        };

        dynamicModulesUtil.clearForms = function (forms) {
            angular.forEach(forms, function(form, formName, obj) {
                dynamicModulesUtil.clearForm(formName);
            });
        }



        dynamicModulesUtil.loadFormWithData = function(formsTmp) {

            if(formsTmp){

                var forms = formsTmp[0];

                angular.forEach(forms, function(form, formName, obj) {
                    //clear out existing form components
                    dynamicModulesUtil.clearForm(formName);
                    angular.forEach(form, function(component) {
                        $builder.insertFormObject(formName, component.index, component);
                    });
                });

            }

        }



        dynamicModulesUtil.getFormFieldsInFormlyFormat = function (myForm) {
            return getOIMConfig.getOIMConfig(myForm, $builder.forms);
        }



        dynamicModulesUtil.initializeFormBuilderData = function () {
            return $builder.forms;
        }





        return dynamicModulesUtil;


    }
})();
