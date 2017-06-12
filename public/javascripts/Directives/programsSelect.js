'use strict';

(function () {
    var programsSelectController = function ($scope,clientPrograms) {
        $scope.programs=[];
       
        var init=function(){
            for (var prop in clientPrograms) {
                if(clientPrograms.hasOwnProperty(prop)){
                    $scope.programs.push({val:parseInt(prop),name:clientPrograms[prop]});
                }
            }
        };

        init();        
    };


   var app=app||angular.module('gymFitness');
   app.directive("programsSelect", [function () {
        return {
            restrict: 'E',
            templateUrl: "/templates/programsSelectTemplate.html",
            scope: {
                ngModel :'='
            },
            replace: true,
            controller: ['$scope','clientPrograms', programsSelectController],
            link: function (scope, element, attrs) {

            }
        };
    }]);
}());
