
'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('paymentsDataService', ['$http','restApi','dateService','$q',
		function ($http,restApi,dateService,$q) {
			
		        var context = this;
		        var newPayment=function(){
					var fromDate=dateService.getDate();
		 			fromDate=dateService.startOfMonth(fromDate);
		  			var toDate=dateService.getDate();
		  			toDate=dateService.endOfMonth(toDate);

		        	return{
		        		fromDate:fromDate,
		        		toDate:toDate,
		        		amount:0,
		        	};
		        };
		        
		        //CRUD
		        var add=function(clientId,payment){
		        	var deferred = $q.defer();
		        	var postUrl=restApi.client+"/"+clientId+"/payment";
						$http.post(postUrl, payment).success(function(data){
							handleDateValues(data);
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var update=function(clientId,payment){
		        	var deferred = $q.defer();
		        	var putUrl=restApi.client+"/"+clientId+"/payment/"+payment._id;
						$http.put(putUrl, payment).success(function(data){
							handleDateValues(data);
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var get=function(clientId,paymentId){
		        	var deferred = $q.defer();
		        	var getUrl=restApi.client+"/"+clientId+"/payment";
		        	getUrl= paymentId ? getUrl +"/" + paymentId : getUrl;

						$http.get(getUrl).success(function(data){
							if(data){
								if(data.length){
									for(var i=0;i<data.length;i++)	
									{
										handleDateValues(data[i]);	
									}
								}else{
									handleDateValues(data);
								}
							}

    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		 

		        	return deferred.promise;
		        };

		         var remove=function(clientId,paymentId){
		        	var deferred = $q.defer();
		        	var deleteUrl=restApi.client+"/"+clientId+"/payment/" + paymentId;
						$http.delete(deleteUrl).success(function(data){
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var handleDateValues=function(payment){
		        		payment.fromDate=dateService.getDate(payment.fromDate);
		        		payment.toDate=dateService.getDate(payment.toDate);
						payment.createDate=dateService.getDate(payment.createDate);
		        };

		        return {
		        	newPayment:newPayment,
		        	add:add,
		        	get:get,
		        	update:update,
		        	remove:remove,
					handleDateValues:handleDateValues
		        };
		}
   	]);
   
})();