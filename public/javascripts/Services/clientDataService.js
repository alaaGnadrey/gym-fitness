
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