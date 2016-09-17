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
      },
        park: function() {

          return $http.jsonp("https://api.namara.io/v0/data_sets/a490dbb3-38ff-42a2-b81f-3cddc5d31b79/data/en-0?api_key=c6cbe02af40424b4401b3dc6f877c6cfe2aaa288ba215268f29d47c0dccc781b");
      }



    };
  })


