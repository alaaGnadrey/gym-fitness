
'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('paymentsCtrl', ['$scope','paymentsDataService','navigatorService','DATE_FORMAT','appMessages','appPages','toaster',function($scope,paymentsDataService,navigatorService,DATE_FORMAT,appMessages,appPages,toaster){
		$scope.payment={};
		$scope.DATE_FORMAT=DATE_FORMAT;
		$scope.clientId=null;

	  	$scope.savePayment=function(form){
		  	if(!form.$invalid){
			  	if($scope.payment && $scope.payment['_id'])
			  	{
					paymentsDataService.update($scope.clientId,$scope.payment).then(function(data){
		  				$scope.payment = data;
		  				toaster.success(appMessages.saveSuccess);
		  			},function(errorMsg){
		  				toaster.error(appMessages.saveError);
			  		});
			  	}else{
			  		paymentsDataService.add($scope.clientId,$scope.payment).then(function(data){
		  					$scope.payment = data;
		  					toaster.success(appMessages.saveSuccess);
							
							var editUrl=appPages.clients + "/" + $scope.clientId+appPages.payments + "/" + $scope.payment._id;
                			navigatorService.navigateTo(editUrl);
		  			},function(errorMsg){
		  				toaster.error(appMessages.saveError);
			  		});
				  }
			}
	  	};

	    var setNewPayment=function(){
	    	$scope.payment= paymentsDataService.newPayment();
	  	};

	  	var editPayment=function(paymentId){
	  		paymentsDataService.get($scope.clientId,paymentId).then(function(data){
				$scope.payment = data;
			},function(errorMsg){
			toaster.error(appMessages.loadError);	
			});
		};
	  
	  	$scope.init=function(clientId,paymentId){
	  		$scope.clientId=clientId;

		  	if(paymentId){
		  		editPayment(paymentId);
		  	}else{
		  		setNewPayment();
		  	}
	  };
  	}]);
})(); 