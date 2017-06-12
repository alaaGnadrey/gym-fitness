
'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('nonepaymentsReportCtrl', ['$scope','reportsDataService','navigatorService','DATE_FORMAT','dateService','appMessages','toaster',function($scope,reportsDataService,navigatorService,DATE_FORMAT,dateService,appMessages,toaster){
		  $scope.DATE_FORMAT=DATE_FORMAT;
		  $scope.clients=[];
		  $scope.fromDate=dateService.getDate();
		  $scope.fromDate=dateService.startOfMonth($scope.fromDate);
		  $scope.toDate=dateService.getDate();
		  $scope.toDate=dateService.endOfMonth($scope.toDate);


		  $scope.execute=function(form){
		  	if(!form.$invalid){
				if($scope.fromDate && $scope.toDate){
				 	var diffFromToByMonth= $scope.fromDate.diff($scope.toDate,"month");
					 if(diffFromToByMonth<=0){
						reportsDataService.nonePaymentsReportData({
							fromDate:$scope.fromDate,
							toDate:$scope.toDate
						}).then(function(reportData){
							if(reportData){
								filterClientsFoReport(reportData);
							}
						},function(errorMsg){
							toaster.error(appMessages.loadError);
						});
					 }else{
						 toaster.error(appMessages.loadError);
						}
				}else{
						toaster.error(appMessages.loadError);
				}
			}};

			function diffByMonthes(fromDate,toDate){
				var tempFromDate=dateService.getDate(fromDate.toString());		
				var tempToDate=dateService.getDate(toDate.toString());

				var diffMonths=tempFromDate.endOf('month').diff(tempToDate.endOf('month'),"months");
				diffMonths=(diffMonths==0)?(tempFromDate.month()-tempToDate.month()):diffMonths;
				return diffMonths;
			};

			function isContainPayment(payments,requestedDate){
				var hasPayment=false;
				if(payments){
					var i=0;
					while(i<payments.length && !hasPayment){
						var diffFromMonth=diffByMonthes(payments[i].fromDate,requestedDate);
						var diffToMonth=diffByMonthes(payments[i].toDate,requestedDate);
						if(diffFromMonth<=0 && diffToMonth>=0)
						{
							hasPayment=true;
						}
						i++;
					}
				}
				return hasPayment;
			};
	
			function filterClientsFoReport(reportData){
				$scope.clients=[];
				if(reportData && reportData.length){
					for(var i=0;i<reportData.length;i++){
						var client=reportData[i];
						var startDate=dateService.getDate($scope.fromDate.toString());
						var missingPayments=[];

						while(diffByMonthes(startDate,$scope.toDate)<=0){
							var isValidMonthForClient= diffByMonthes(client.registerDate,startDate);
							if(isValidMonthForClient<=0){
								var hasPayment=isContainPayment(client.payments,startDate);
								if(!hasPayment){
									missingPayments.push(dateService.getDate(startDate));
								}
							}

							startDate=startDate.add(1, 'M');
						}

						if(missingPayments.length){
							client["missingPayments"]=missingPayments;
							$scope.clients.push(client);
						}
					}
				}
			};
	}]);
})(); 