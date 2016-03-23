angular.module('capstone', ['ionic', 'ngCordova', 'capstone.controllers', 'capstone.services', 'firebase'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  console.log("Hello from Ionic!!!")
  $stateProvider

    .state('home', {
      url:'/home',
      controller:'HomeController',
      templateUrl: 'templates/home.html'
    })
    .state('create', {
      url: '/create',
      controller: 'PictureCtrl',
      templateUrl: 'templates/modal.html'
    })
    .state('favorites', {
      url: '/favorites',
      controller: 'FavoritesController',
      templateUrl: 'templates/favorites.html'
    })
    .state('room',{
      url: '/room/:id',
      controller: function($scope, $stateParams, $http, $ionicModal){
        var socket = io.connect("http://localhost:5000/posts")
        $scope.id = $stateParams.id
        $http.get('https://infinite-waters-87993.herokuapp.com/events').then(function(response){
          $scope.postResults = []
          for(var i = 0; i < response.data.length; i++){
            if($scope.id === response.data[i]._id.$oid){
              for(var j = 0; j < response.data[i].posts.length; j++){
                $scope.postResults.push(response.data[i].posts[j])
              }
              console.log($scope.postResults)
            }
          }
        })

      $scope.showModal = function(){
        $scope.modal.show()
      };

      $scope.hideModal = function() {
        $scope.modal.hide();
      };

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.createPost = function(postBody, postName, postImage) {
        if(postImage === undefined){
          var data = {
            id: $scope.id,
            body: postBody,
            name: postName
          }
        } else {
            var postData = {
              id: $scope.id,
              body: postBody,
              name: postName,
              image: postImage
            }
            var socket = io.connect('https://infinite-waters-87993.herokuapp.com/test')
            socket.on('test_event', function(message){
              console.log(message)
            })

            socket.on('newPostEvent', function(post){
              console.log(post)
            })
          }
        }
      },
      templateUrl: 'templates/live.html'
    });
  $urlRouterProvider.otherwise('/home');

});
