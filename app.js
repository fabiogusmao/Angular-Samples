angular.module('samples', [])
    .controller('Ctrl', function ($scope) {
        $scope.recipients = [];

    })

    .controller('EmailListCtrl', function ($scope, $element, $attrs) {

        $scope.emails = $scope.$parent.$eval($attrs.ngModel);

        $scope.me = {
            email: ''
        };

        $scope.addEmail = function () {
            var lower = $scope.me.email.toLowerCase();
            if ($scope.emails.filter(function (x) {
                return x && x.toLowerCase() == lower;
            }).length == 0)
                $scope.emails.push($scope.me.email);
            delete $scope.me.email;

        };
        $scope.removeEmail = function (index) {
            $scope.emails.splice(index, 1);
        };
    })
    .directive('emailList', function () {
        return {
            require: 'ngModel',
            controller: 'EmailListCtrl',
            templateUrl: 'EmailList.htm',
            scope: true,

        }
    })
    .directive('checkDuplicate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {

                ctrl.$validators.duplicate = function (v) {
                    if (v) {
                        var duplicates = scope.$eval(attr.ngModel);
                        var lower = v.toLowerCase().replace(/(^\s*|\s*$)/g, "");
                        return duplicates.filter(function (x) {
                            return x && x.toLowerCase() == lower;
                        }).length == 0;
                    } else
                        return true;
                };
                ctrl.$validators.anyItem = function (v) {

                    var duplicates = scope.$eval(attr.ngModel);
                    return duplicates.length > 0;
                };
            }
        }
    })
    ;