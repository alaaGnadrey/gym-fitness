'use strict';

(function () {
    var clientActiveStatusController = function ($scope,clientActiveStatus) {
        $scope.activeStatus=[];
       
        var init=function(){
            for (var prop in clientActiveStatus) {
                if(clientActiveStatus.hasOwnProperty(prop)){
                    $scope.activeStatus.push({val:parseInt(prop),name:clientActiveStatus[prop]});
                }
            }
        };

        init();        
    };


   var app=app||angular.module('gymFitness');
   app.directive("clientActiveStatus", [function () {
        return {
            restrict: 'E',
            templateUrl: "/templates/clientActiveStatusTemplate.html",
            scope: {
                ngModel :'='
            },
            replace: true,
            controller: ['$scope','clientActiveStatus', clientActiveStatusController],
            link: function (scope, element, attrs) {

            }
        };
    }]);
}());
