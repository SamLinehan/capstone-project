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

  // setup an abstract state for the tabs directive
    .state('home', {
      url:'/home',
      controller:'HomeController',
      templateUrl: 'templates/home.html'
    })
    .state('create', {
      url: '/create',
      controller: 'PictureCtrl',
      templateUrl: 'templates/create.html'
    })
    .state('favorites', {
      url: '/favorites',
      controller: 'FavoritesController',
      templateUrl: 'templates/favorites.html'
    })
    .state('room',{
      url: '/room/:id',
      controller: function($scope, $stateParams, $http){
        $scope.id = $stateParams.id
        $scope.postResults = []
        $http.get('https://infinite-waters-87993.herokuapp.com/events').then(function(response){
          for(var i = 0; i < response.data.length; i++){
            if($scope.id === response.data[i]._id.$oid){
              for(var j = 0; j < response.data[i].posts.length; j++){
                $scope.postResults.push(response.data[i].posts[j])
              }
              console.log($scope.postResults)
            }
          }
        })
        var socket = io.connect('http://localhost:5000/test')
        socket.on('test_event', function(message){
          console.log(message)
        })
      },
      templateUrl: 'templates/live.html'
    });
  $urlRouterProvider.otherwise('/home');

});
