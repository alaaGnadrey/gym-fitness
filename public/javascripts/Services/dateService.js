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
