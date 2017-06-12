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