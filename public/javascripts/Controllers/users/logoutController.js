
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