'use strict';

(function () {
    var app=app||angular.module('gymFitness');
    app.filter('dateFormat', ['dateService',function (dateService) {
        return function (input,format) {
            return dateService.format(input,format);
        };
    }]);
})();
