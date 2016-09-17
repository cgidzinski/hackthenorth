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



.controller('ParkCtrl', function($scope, $state, APIreq, $http) {
  $scope.$on('$ionicView.enter', function(e) {

 $scope.doRefresh = function() {
       $scope.result = "";
  $http.get("https://api.namara.io/v0/data_sets/a490dbb3-38ff-42a2-b81f-3cddc5d31b79/data/en-0?api_key=c6cbe02af40424b4401b3dc6f877c6cfe2aaa288ba215268f29d47c0dccc781b")
    .success(function(data, status, headers,config){

      $scope.result = data; // for UI
      $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    });
 }
$scope.doRefresh();
  });
})





.controller('HomeCtrl', function($scope, $state, APIreq, $http, $cordovaGeolocation) {
  $scope.$on('$ionicView.enter', function(e) {
    if (APIreq.tokenValid() == false) {
      $state.go('login');
    }
//
var mapOptions = {
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
//        
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
//
      navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        });


        $scope.map = map;
    
setInterval(function(){ 

navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        
        var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "You"
            });

        });



}, 1000);



//
  });
 })

.controller('MemoryCtrl', function($scope, $state, APIreq, $http, $ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
    if (APIreq.tokenValid() == false) {
      $state.go('login');
    }
 $scope.doRefresh = function() {
 APIreq.getmemory().then(function(response){
    if (response.data.success == true)
    {
      console.log(response.data.message);
      $scope.memories = response.data.message;
      $scope.$broadcast('scroll.refreshComplete');
    }
    else
    {
      $state.go('login');
    }
        
    });
 }
$scope.doRefresh();

$scope.memory = {};
  $scope.sendMemory = function() {
   
    APIreq.postmemory("location", $scope.memory.data, "text").then(function(res) {
          if (res.data.success == true) {
            var alertPopup = $ionicPopup.alert({title: 'Memory Submitted'});
            $scope.memory.data = "";
         $scope.doRefresh(); 
          } 
        });
    };
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
