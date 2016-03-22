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
        $http.get('https://infinite-waters-87993.herokuapp.com/events').then(function(response){
          var postResults = []
          for(var i = 0; i < response.data.length; i++){
            if($scope.id === response.data[i]._id.$oid){
              console.log(response.data[i])
              console.log(response.data[i].posts)
              postResults.push(response.data[i].posts)
            }
          }
        })
      },
      templateUrl: 'templates/live.html'
    });
  $urlRouterProvider.otherwise('/home');

});
