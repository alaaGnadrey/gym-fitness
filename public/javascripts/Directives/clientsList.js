'use strict';

(function () {
    var clientsListController = function ($scope,clientDataService,navigatorService,appPages,DATE_FORMAT) {
        $scope.clientsCollection=[];
        $scope.DATE_FORMAT=DATE_FORMAT;
        $scope.editClient=function(selectedClient){
            if(selectedClient){
                var editUrl=appPages.clients + "/" + selectedClient._id;
                navigatorService.navigateTo(editUrl);
            }
        };

        var getAllClients=function(){
            clientDataService.get().then(function(data){
                    $scope.clientsCollection = data;
            },function(errorMsg){

            });
        };

        var init=function(){ 
            getAllClients();
        };

          //start loading controller
        init();
    };


   var app=app||angular.module('gymFitness');
   app.directive("clientsList", [function () {
        return {
            restrict: 'E',
            templateUrl: "/templates/clientsListTemplate.html",
            scope: {},
            replace: true,
            controller: ['$scope','clientDataService','navigatorService','appPages','DATE_FORMAT', clientsListController],
            link: function (scope, element, attrs, ngModel) {

            }
        };
    }]);
}());