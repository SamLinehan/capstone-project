angular.module('capstone', ['ionic', 'ngCordova', 'capstone.controllers', 'capstone.services', 'firebase'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
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
    .state('results', {
      url:'/results',
      controller:'ResultsController',
      templateUrl: 'templates/results.html'
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
    });
  $urlRouterProvider.otherwise('/home');

});
