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
