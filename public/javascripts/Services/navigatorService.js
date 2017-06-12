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
