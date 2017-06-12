
'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('reportsDataService', ['$http','restApi','dateService','$q','clientDataService','paymentsDataService',
		function ($http,restApi,dateService,$q,clientDataService,paymentsDataService) {
				var context = this;

		        var nonePaymentsReportData=function(reportParams){
		        	var deferred = $q.defer();
		        	var postUrl=restApi.reports+"/nonePayments";
						$http.post(postUrl, reportParams).success(function(data){
							handleDateValues(data);
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var handleDateValues=function(clients){
					if(clients){
						for(var i=0;i<clients.length;i++){
							var client=clients[i];
							clientDataService.handleDateValues(client);

							if(client.payments){
								for(var j=0;j<client.payments.length;j++){
									var payment=client.payments[j];
									paymentsDataService.handleDateValues(payment);
								}
							}
						}
					}
		        };

		        return {
		        	nonePaymentsReportData:nonePaymentsReportData
		        };
		}
   	]);
})();