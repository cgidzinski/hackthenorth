angular.module('starter.controllers', ['angular-jwt', 'ngCordova'])
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
       
  $http.get("https://api.namara.io/v0/data_sets/b4735bb9-d73d-4231-a362-a3760fdf3633/data/en-0?api_key=c6cbe02af40424b4401b3dc6f877c6cfe2aaa288ba215268f29d47c0dccc781b")
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

.controller('PoiCtrl', function($scope, $state, APIreq, $http) {
  $scope.$on('$ionicView.enter', function(e) {

 $scope.doRefresh = function() {
       $scope.result = "";
       
  $http.get("https://api.namara.io/v0/data_sets/30c7a679-9b89-45fd-ae33-0e5991695f61/data/en-0?api_key=c6cbe02af40424b4401b3dc6f877c6cfe2aaa288ba215268f29d47c0dccc781b")
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



.controller('HomeCtrl', function($scope, $state, APIreq, $http, $cordovaGeolocation, $ionicPopup) {
  $scope.$on('$ionicView.enter', function(e) {
    if (APIreq.tokenValid() == false) {
      $state.go('login');
    }
var lat;
var lon;
     $scope.doRefresh = function() {
 APIreq.getmemory().then(function(response){
    if (response.data.success == true)
    {
      //console.log(response.data.message);
      $scope.memories = response.data.message;
          
      for (var i = $scope.memories.length - 1; i >= 0; i--) {
        //$scope.memories[i].lat
              var pmarker = new google.maps.Marker({
                position: new google.maps.LatLng($scope.memories[i].lat, $scope.memories[i].lon),
                map: map,
                icon: pmarkerimage,
                title: $scope.memories[i]._id,
                lat:$scope.memories[i].lat,
                lon:$scope.memories[i].lon,
                data:$scope.memories[i].data,
                author:$scope.memories[i].author,
                date:$scope.memories[i].date,
                type:$scope.memories[i].type
            });
               pmarker.setAnimation(google.maps.Animation.BOUNCE);
              //console.log(pmarker)
              google.maps.event.addListener(pmarker, 'click', function() {
        var dist = getDistanceFromLatLonInKm(this.lat,this.lon,lat,lon)
      //if (dist < 0.025){
        var post = "<div class='post'>"+this.data+"<br><br><p>Date: "+this.date+"</p><p>Author: "+ this.author+"</p></div>";

        if (this.type == "image"){
 post = "<div class='post'><img src='"+this.data+"'><br><br><p>Date: "+this.date+"</p><p>Author: "+ this.author+"</p></div>";
        }
        
     
        $ionicPopup.alert({title: "Memory", template: post});
      //}else
      //{
       // alert("Too Far away!")
      //}
                      
        

                

            });
      };


      $scope.$broadcast('scroll.refreshComplete');
    }
    else
    {
      $state.go('login');
    }
        
    });
 }

//
var mapOptions = {
            zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: false,
      scrollwheel: false,
      panControl: false

        }; 
//        
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = google.maps.Marker;
        var markerimage = 'http://iconshow.me/media/images/ui/ios7-icons/png/32/person_1.png';
        var pmarkerimage = 'http://orig12.deviantart.net/9e02/f/2010/076/0/7/tiny_icon_for_nicnak044_by_orcacat88.gif';  
//
        



      navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            lat = pos.coords.latitude;
            lon=pos.coords.longitude;
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "You",
                icon: markerimage
            });
            $scope.doRefresh();
            //marker.setAnimation(google.maps.Animation.BOUNCE);

        });


        $scope.map = map;
    
  var options = {
  enableHighAccuracy: true
};  




google.maps.event.addListenerOnce($scope.map, 'idle', function(){

setInterval(function(){ 

navigator.geolocation.getCurrentPosition(function(pos) {
  lat = pos.coords.latitude;
            lon=pos.coords.longitude;
            
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

          marker.setPosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

        
 

        },function(error) {},options);



}, 5000);


});
//
  });
 })

.controller('MemoryCtrl', function($scope, $state, APIreq, $http, $ionicPopup,$cordovaCamera) {
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
   //
navigator.geolocation.getCurrentPosition(function(pos) {
     
 APIreq.postmemory(pos.coords.latitude,pos.coords.longitude, $scope.memory.data, "text").then(function(res) {
          if (res.data.success == true) {
            var alertPopup = $ionicPopup.alert({title: 'Memory Submitted'});
            $scope.memory.data = "";
         $scope.doRefresh(); 
          } 
        });
        });
   //
   
    };
  });

   $scope.takePicture = function() {
       var options = { quality : 75, destinationType : navigator.camera.DestinationType.FILE_URI, sourceType : navigator.camera.PictureSourceType.CAMERA, encodingType: Camera.EncodingType.JPEG, targetWidth: 300, targetHeight: 300, popoverOptions: CameraPopoverOptions, saveToPhotoAlbum: false }
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
          //alert(imageData);
           //$scope.imgURI = "data:image/jpeg;base64," + imageData;

navigator.geolocation.getCurrentPosition(function(pos) {
     
 APIreq.postmemory(pos.coords.latitude,pos.coords.longitude,imageData, "image").then(function(res) {
          if (res.data.success == true) {
            var alertPopup = $ionicPopup.alert({title: 'Memory Submitted'});
            $scope.memory.data = "";
         $scope.doRefresh(); 
          } 
        });
        });


//  var config = {
//     apiKey: "AIzaSyDh9zBrjKikMHSVUWYb_ISfKhUvZP0WhPo",
//     authDomain: "hackthenorth-dd6a2.firebaseapp.com",
//     databaseURL: "https://hackthenorth-dd6a2.firebaseio.com",
//     storageBucket: "hackthenorth-dd6a2.appspot.com",
//     messagingSenderId: "506669553152"
//   };
//   firebase.initializeApp(config);
//   var storage = firebase.storage();


// // File or Blob named mountains.jpg
// var file = "data:image/jpeg;base64," + imageData;
// alert("loading")
// // Create the file metadata
// var metadata = {
//   contentType: 'image/jpeg'
// };

// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     alert('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         alert('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         alert('Upload is running');
//         break;
//     }
//   }, function(error) {
//   switch (error.code) {
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       alert('Err au');
//       break;

//     case 'storage/canceled':
//       // User canceled the upload
//       alert('Err c');
//       break;

    

//     case 'storage/unknown':
//       // Unknown error occurred, inspect error.serverResponse
//       alert('Err u');
//       break;
//   }
// }, function() {
//   // Upload completed successfully, now we can get the download URL
//   var downloadURL = uploadTask.snapshot.downloadURL;
//   alert(downloadURL);
// });













        }, function(err) {
           alert(error);
            // An error occured. Show a message to the user
        });
    }


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


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}