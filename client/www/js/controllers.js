angular.module('capstone.controllers', [])

.controller('HomeController', HomeController)
.controller('PictureCtrl', function($scope, $cordovaCamera, $cordovaFile) {

  $scope.images = [];

      $scope.addImage = function() {
          // 2
          var options = {
              destinationType : Camera.DestinationType.FILE_URI,
              sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
              allowEdit : false,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
          };

          // 3
          $cordovaCamera.getPicture(options).then(function(imageData) {

              // 4
              onImageSuccess(imageData);

              function onImageSuccess(fileURI) {
                  createFileEntry(fileURI);
              }

              function createFileEntry(fileURI) {
                  window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
              }

              // 5
              function copyFile(fileEntry) {
                  var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                  var newName = makeid() + name;

                  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                      fileEntry.copyTo(
                          fileSystem2,
                          newName,
                          onCopySuccess,
                          fail
                      );
                  },
                  fail);
              }

              // 6
              function onCopySuccess(entry) {
                  $scope.$apply(function () {
                      $scope.images.push(entry.nativeURL);
                  });
              }

              function fail(error) {
                  console.log("fail: " + error.code);
              }

              function makeid() {
                  var text = "";
                  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                  for (var i=0; i < 5; i++) {
                      text += possible.charAt(Math.floor(Math.random() * possible.length));
                  }
                  return text;
              }

          }, function(err) {
              console.log(err);
          });
      }

      $scope.urlForImage = function(imageName) {
          var name = imageName.substr(imageName.lastIndexOf('/') + 1);
          var trueOrigin = cordova.file.dataDirectory + name;
          return trueOrigin;
      }
})
.controller('ResultsController', function(){
  console.log("Hello from Results Controller")
});

function HomeController($scope){
   console.log("Hello from Home Controller")
   $scope.search = function(value){
     console.log(value)
   }
  //  $scope.googleAuth = function(){
  //   $cordovaOauth.google("589066861537-6tlold0mp9qbi9skg3m773k5du8q1f88.apps.googleusercontent.com",
  //     ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
  //     "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"]).
  //   then(function(result){
  //     console.log("google login success");
  //     var accessToken;
  //     //$location.url('/scan');
  //     console.log(JSON.stringify(result));
  //     accessToken = JSON.stringify(result);
  //     console.log(result.access_token);
  //     console.log(typeof(result.access_token));
  //
  //     //getting profile info of the user
  //     $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+result.access_token}).
  //     success(function(response){
  //              console.log(response);
  //             var param = {
  //               provider: 'google',
  //                 google: {
  //                               uid: response["id"],
  //                               provider: 'google',
  //                               first_name: response["name"]["givenName"],
  //                               last_name: response["name"]["familyName"],
  //                               email: response.emails[0]["value"],
  //                               image: response.image.url
  //                           }
  //               };
  //               console.log(param);
  //     }, function(error) {
  //     console.log(error);
  //   });
  //
  // }, function(error){
  //   console.log(error);
  //   });
  // }
}
