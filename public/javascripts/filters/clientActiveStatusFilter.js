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