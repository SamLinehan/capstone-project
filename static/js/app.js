angular.module('capstone', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    console.log("Hello from Angular")

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
      templateUrl: 'index.html',
      controller: 'HomeController',
      url: '/home'
    })
  })
