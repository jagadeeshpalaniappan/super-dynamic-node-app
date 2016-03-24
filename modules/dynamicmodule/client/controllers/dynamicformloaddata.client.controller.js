'use strict';

angular.module('dynamicmodule')
    .controller('DynamicFormLoadDataController', ['formlyVersion', 'getOIMConfig', '$scope', '$builder', '$validator', '$timeout', '$location',
            function MainCtrl(formlyVersion, getOIMConfig, $scope, $builder, $validator, $timeout, $location) {




                var vm = this;

                vm.model = {};
                vm.options = {};

                //---------------------------- Form with Loaded Data--------------------------------


                vm.jformData =
                {
                    "default-textInput-7221": "Jagadeesh",
                    "default-textArea-5058": "He is awesome!!!",
                    "default-radio-1507": "Male",
                    "default-select-3047": "India",
                    "default-checkbox-9625": [
                        "Ice Cream",
                        "Cookies"
                    ]
                };


                vm.jformFields =
                    [
                        {
                            "key": "default-textInput-7221",
                            "templateOptions": {
                                "required": true,
                                "label": "First Name",
                                "placeholder": "First Name"
                            },
                            "type": "input"
                        },
                        {
                            "key": "default-textArea-5058",
                            "templateOptions": {
                                "required": false,
                                "label": "Description",
                                "placeholder": "Description"
                            },
                            "type": "textarea"
                        },
                        {
                            "key": "default-radio-1507",
                            "templateOptions": {
                                "required": false,
                                "label": "Sex",
                                "placeholder": "placeholder",
                                "valueProp": "value",
                                "keyProp": "name",
                                "options": [
                                    {
                                        "name": "Male",
                                        "value": "Male"
                                    },
                                    {
                                        "name": "Female",
                                        "value": "Female"
                                    }
                                ]
                            },
                            "type": "radio"
                        },
                        {
                            "key": "default-select-3047",
                            "templateOptions": {
                                "required": false,
                                "label": "Country",
                                "placeholder": "placeholder",
                                "options": [
                                    {
                                        "name": "India",
                                        "value": "India"
                                    },
                                    {
                                        "name": "U S",
                                        "value": "US"
                                    },
                                    {
                                        "name": "Singapore",
                                        "value": "Singapore"
                                    }
                                ]
                            },
                            "type": "select"
                        },
                        {
                            "key": "default-checkbox-9625",
                            "templateOptions": {
                                "required": false,
                                "label": "Favourite",
                                "placeholder": "placeholder",
                                "options": [
                                    "Ice Cream",
                                    "Chocolate",
                                    "Cookies"
                                ]
                            },
                            "type": "checkBoxList"
                        }
                    ];



                //Only for Disaply purpose //Not required
                vm.jformFieldsTmp =  angular.copy(vm.jformFields);


                vm.onSubmit = function(){
                    if (vm.form.$valid) {
                        alert("Its Valid");
                        //vm.options.updateInitialValue();
                        alert(JSON.stringify(vm.jformData), null, 2);
                    }else{
                        alert("Its Invalid");
                    }
                }






            }]);
