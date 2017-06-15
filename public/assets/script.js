'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('authService',  ['restApi','$q', '$timeout', '$http',
  function (restApi,$q, $timeout, $http) {

    // create user variable
    var user = null;

    function isLoggedIn() {
        if(user) {
            return true;
        } else {
            return false;
        }
    };

    function getUserStatus() {
        return user;
    };

    function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        var postUrl=restApi.users+"/login";
        $http.post(postUrl,{username: username, password: password}).success(function (data, status) {
            if(status === 200 && data.status){
                user = true;
                deferred.resolve();
            } else {
                user = false;
                deferred.reject();
            }
            }).error(function (data) {
                user = false;
                deferred.reject();
            });
        // return promise object
        return deferred.promise;
    }

       // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login
    });
  }]);
})();


'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('clientDataService', ['$http','restApi','dateService','$q',
		function ($http,restApi,dateService,$q) {
		        var context = this;
		        var newClient=function(){
		        	return{
		        		fname:"",
		        		lname:"",
		        		identity:null,
		        		birthday:null,
		        		creationDate:new Date(),
		        		status:0,
		        		phone1:"",
		        		phone2:"",
		        		address:"",
		        		program:0
		        	};
		        };
		        
		        //CRUD
		        var add=function(client){
		        	var deferred = $q.defer();
						$http.post(restApi.client, client).success(function(data){
							handleDateValues(data);
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var update=function(client){
		        	var deferred = $q.defer();
						$http.put(restApi.client +"/" + client._id, client).success(function(data){
							handleDateValues(data);
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var get=function(id){
		        	var deferred = $q.defer();
		        	var requestUrl= restApi.client;
		        	requestUrl=id ? requestUrl +"/" + id : requestUrl;

						$http.get(requestUrl).success(function(data){
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

		         var remove=function(id){
		        	var deferred = $q.defer();
						$http.delete(restApi.client +"/" + id).success(function(data){
    						deferred.resolve(data);
  						}).error(function(msg, code) {
          					deferred.reject(msg);
       					});		

		        	return deferred.promise;
		        };

		        var handleDateValues=function(client){
		        	if(client.birthday){
		        		client.birthday=dateService.getDate(client.birthday);
				 	}
					if(client.registerDate){
						client.registerDate=dateService.getDate(client.registerDate);
					}
		        };

		        return {
		        	newClient:newClient,
		        	add:add,
		        	get:get,
		        	update:update,
		        	remove:remove,
					handleDateValues:handleDateValues
		        };
		}
   	]);
   
})();
'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('dateService', ['DATE_FORMAT',
		function (DATE_FORMAT) {
            var getDate=function(dateValue){
                if(dateValue)
                    return moment(dateValue);
                 
                return moment();
            };
			
            var startOfMonth=function(dateValue){
                return dateValue.add(-1,'M').endOf('month').add(1,'d');
            };

            var endOfMonth=function(dateValue){
                return dateValue.endOf('month');
            };

            var format=function(dateValue,formatTemplate){
                if(dateValue){
                    formatTemplate=formatTemplate||DATE_FORMAT;
                    return dateValue.format(formatTemplate);
                }
            
                return null;
            };

		    return {
                getDate:getDate,
                startOfMonth:startOfMonth,
                endOfMonth:endOfMonth,
                format:format
		    };
		}
   	]);
   
})();

'use strict';

(function () {
   var app=app||angular.module('gymFitness');
   app.service('navigatorService', ['$location','$window',
		function ($location,$window) {
		        
			var searchParam=function(paramName){
	        	var queryParams=$location.search();
	        	if(queryParams && queryParams.hasOwnProperty(paramName))
	        	{
	        		return queryParams[paramName];
	        	}

	        	return null;
	        };

	        var navigateTo=function(url){
	        	if(url){
	        		
	        		$window.location.href=url;
	        	}
	        };
		        return {
		        searchParam:searchParam,
	        	navigateTo:navigateTo
		        };
		}
   	]);
   
})();


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
'use strict';

(function () {
    var app=app||angular.module('gymFitness');
    app.filter('activeStatus',['clientActiveStatus', function (clientActiveStatus) {
        return function (status) {
            var value = clientActiveStatus[status];
            return value;           
        };
    }]);
})();
'use strict';

(function () {
    var app=app||angular.module('gymFitness');
    app.filter('dateFormat', ['dateService',function (dateService) {
        return function (input,format) {
            return dateService.format(input,format);
        };
    }]);
})();

'use strict';

(function () {
    var app=app||angular.module('gymFitness');
    app.filter('numbers', function () {
        return function (tel) {
            console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            

        };
    });
})();

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

'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('homeCtrl', ['$scope',function($scope){
		  
	}]);

})(); 

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

'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('nonepaymentsReportCtrl', ['$scope','reportsDataService','navigatorService','DATE_FORMAT','dateService','appMessages','appPages','toaster',function($scope,reportsDataService,navigatorService,DATE_FORMAT,dateService,appMessages,appPages,toaster){
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
			}
		  };

		  $scope.getUserPaymentsUrl=function(userId){
			return appPages.clients+"/"+userId+appPages.payments;
		  }

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

'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('loginCtrl', ['$scope', '$location', 'authService','appMessages',function($scope, $location, authService,appMessages){
	    $scope.login = function () {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            authService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function () {
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function () {
                    $scope.error = true;
                    $scope.errorMessage =appMessages.invalidUsernameOrPassword;
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });
        };
	}]);
})(); 

'use strict';

(function () {
	var app=app||angular.module('gymFitness');
	app.controller('logoutCtrl', ['$scope', '$location', 'authService','appMessages',function($scope, $location, authService,appMessages){
		  $scope.login = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        authService.login($scope.loginForm.username, $scope.loginForm.password)
          // handle success
          .then(function () {
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage =appMessages.invalidUsernameOrPassword;
            $scope.disabled = false;
            $scope.loginForm = {};
          });
      };
	}]);
})(); 
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

'use strict';

(function () {
    var clientsListController = function ($scope,clientDataService,navigatorService,appPages,DATE_FORMAT,DTOptionsBuilder) {
        
        $scope.clientsCollection=[];
        $scope.DATE_FORMAT=DATE_FORMAT;
        $scope.editClient=function(selectedClient){
            if(selectedClient){
                var editUrl=appPages.clients + "/" + selectedClient._id;
                navigatorService.navigateTo(editUrl);
            }
        };
        $scope.dtOptions=DTOptionsBuilder.newOptions()
                        .withLanguageSource("/assets/sb-admin/js/jquery/Hebrew.json");

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
            controller: ['$scope','clientDataService','navigatorService','appPages','DATE_FORMAT','DTOptionsBuilder', clientsListController],
            link: function (scope, element, attrs, ngModel) {
                    scope.element=element;
            }
        };
    }]);
}());

'use strict';

(function () {
var app=app||angular.module('gymFitness');

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
})();
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
                clientId:"="
            },
            replace: true,
            controller: ['$scope','paymentsDataService','navigatorService','appPages','DATE_FORMAT', paymentsListController],
            link: function (scope, element, attrs, ngModel) {

            }
        };
    }]);
}());

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
