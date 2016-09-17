angular.module('starter')
  .factory('APIreq', function(jwtHelper, $ionicPopup, $state, $http) {
    return {
      tokenValid: function() {
        if (window.localStorage['LOCAL_TOKEN_KEY'] != null && jwtHelper.isTokenExpired(window.localStorage['LOCAL_TOKEN_KEY']) == false) {
          return true;
        } else {
          return false;
        }
      },


      signup: function(name, email, password) {
        $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
        return $http.post("http://104.197.29.38:8080/api/register", {name: name,password: password,email: email});
      },


   login: function(email, password) {
    $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];

        return $http.post("http://104.197.29.38:8080/api/login", {email: email,password: password});
      },

         profile: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];

          return $http.get("http://104.197.29.38:8080/api/user");
      }



    };
  })


