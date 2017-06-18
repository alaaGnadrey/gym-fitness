'use strict';

(function () {
    var paymentsListController = function ($scope,paymentsDataService,navigatorService,appPages,DATE_FORMAT) {
        $scope.paymentsCollection=[];
        $scope.DATE_FORMAT=DATE_FORMAT;
        $scope.editPayment=function(selectedPayment){
            if(selectedPayment){
                var editUrl=appPages.clients + "/" + $scope.clientId+appPages.payments+"/"+selectedPayment._id;
                navigatorService.navigateTo(editUrl);
            }
        };

        $scope.isSelectedPayment=function(payment){
            if($scope.selectedPayment)
                return $scope.selectedPayment._id==payment._id;
            return false;
        };

        var getAllPayments=function(){
            paymentsDataService.get($scope.clientId).then(function(data){
                    $scope.paymentsCollection = data;
            },function(errorMsg){
            });
        };

        var init=function(){ 
            getAllPayments();
        };

          //start loading controller
        init();
    };


   var app=app||angular.module('gymFitness');
   app.directive("paymentsList", [function () {
        return {
            restrict: 'E',
            templateUrl: "/templates/paymentsListTemplate.html",
            scope: {
                clientId:"=",
                selectedPayment:"="
            },
            replace: true,
            controller: ['$scope','paymentsDataService','navigatorService','appPages','DATE_FORMAT', paymentsListController],
            link: function (scope, element, attrs, ngModel) {

            }
        };
    }]);
}());
