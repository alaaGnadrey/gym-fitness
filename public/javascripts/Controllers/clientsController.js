
'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('clientsCtrl', ['$scope','clientDataService','navigatorService','DATE_FORMAT','appMessages','appPages','toaster',function($scope,clientDataService,navigatorService,DATE_FORMAT,appMessages,appPages,toaster){
		  $scope.client={};
		  $scope.DATE_FORMAT=DATE_FORMAT;
		  		  
		  $scope.saveClient=function(form){
		  	if(!form.$invalid){
			  	if($scope.client && $scope.client['_id'])
			  	{
					clientDataService.update($scope.client).then(function(data){
		  				$scope.client = data;
		  				toaster.success(appMessages.saveSuccess);
		  			},function(errorMsg){
		  				toaster.error(appMessages.saveError);
			  		});
			  	}else{
			  		clientDataService.add($scope.client).then(function(data){
		  					$scope.client = data;
		  					toaster.success(appMessages.saveSuccess);

							var editUrl=appPages.clients + "/" + $scope.client._id;
                			navigatorService.navigateTo(editUrl);

		  			},function(errorMsg){
		  				toaster.error(appMessages.saveError);
			  		});
				  }
			}
		  };

		  $scope.getUserPaymentsUrl=function(clientId){
			return appPages.clients+"/"+clientId+appPages.payments;
		  };

		  var setNewClient=function(){
			$scope.client= clientDataService.newClient();
		  };

		  var editClient=function(clientId){
		  	clientDataService.get(clientId).then(function(data){
	  			$scope.client = data;
	  		},function(errorMsg){
				toaster.error(appMessages.loadError);
	  		});
		  };
		  
		  $scope.init=function(clientId){
		 
		  	if(clientId){
		  		editClient(clientId);
		  	}else{
		  		setNewClient();
		  	}
		  	
		  };
	}]);
})(); 