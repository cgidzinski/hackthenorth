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
        return $http.post("https://lan-ce.com/api/signup", {name: name,password: password,email: email});
      },


   login: function(email, password) {
    $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];

        return $http.post("https://lan-ce.com/api/login", {email: email,password: password});
      },

         profile: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/user");
      },
         info: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/info");
      },
         notifications: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/notifications");
      },
               events: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/events");
      },
                     event: function(id) {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/event/"+id);
      },
                     streams: function() {
          $http.defaults.headers.common['x-access-token'] = window.localStorage['LOCAL_TOKEN_KEY'];
          return $http.get("https://lan-ce.com/api/streams");
      }



    };
  })


