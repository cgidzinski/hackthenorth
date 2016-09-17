angular.module('starter.controllers', ['angular-jwt'])
.controller('AppCtrl', function($scope, $ionicPopup, $http, $state) {
  $scope.logout = function() {
    window.localStorage.removeItem('LOCAL_TOKEN_KEY');
    $http.defaults.headers.common['x-access-token'] = null;
    var alertPopup = $ionicPopup.alert({
      title: 'Logged Out'
    });
    $state.go('login');
  }
})

.controller('LoginCtrl', function($scope, $state, APIreq, $ionicPopup) {
  $scope.loginData = {};
  $scope.doLogin = function() {
    APIreq.login($scope.loginData.email, $scope.loginData.password).then(function(res) {
          if (res.data.success == true) {
            var alertPopup = $ionicPopup.alert({title: 'Login Successful'});
            window.localStorage['LOCAL_TOKEN_KEY'] = res.data.token;
         $state.go('app.home');  
          } else {
            var alertPopup = $ionicPopup.alert({title: 'Login Failed'});
          }
        });
  };
  $scope.goSignup = function() {
    $state.go('signup');
  }
})

.controller('SignupCtrl', function($scope, $state, APIreq, $ionicPopup) {
  $scope.signupData = {};
  $scope.doSignup = function() {
    APIreq.signup($scope.signupData.name, $scope.signupData.email, $scope.signupData.password).then(function(res) {
          if (res.data.success == true) {
            var alertPopup = $ionicPopup.alert({title: 'User Created'});
            $state.go('login'); 
          } else {
            var alertPopup = $ionicPopup.alert({title: 'User Already Exists'});
          }
        });
  };
  $scope.goLogin = function() {
    $state.go('login');
  }
})









>>>>>>> origin/master
.controller('HomeCtrl', function($scope, $state, APIreq, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (APIreq.tokenValid() == false) {
      $state.go('login');
    }
  });

 })




.controller('ProfileCtrl', function($scope, $state, APIreq, $http) {
  $scope.$on('$ionicView.enter', function(e) {
    if (APIreq.tokenValid() == false) {
      $state.go('login');
    }
 $scope.doRefresh = function() {
 APIreq.profile().then(function(response){
    if (response.data.success == true)
    {
      $scope.profile = response.data.message;
      $scope.$broadcast('scroll.refreshComplete');
    }
    else
    {
      $state.go('login');
    }
        
    });
 }
$scope.doRefresh();
  });
})

