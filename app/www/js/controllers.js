angular.module('capstone.controllers', [])

.controller('HomeController', HomeController)
.controller('ResultsController', function(){
  console.log("Hello from Results Controller")
});

function HomeController($scope){
 console.log("Hello from Home Controller")
 $scope.search = function(value){
   console.log(value)
 }
}
