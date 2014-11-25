angular.module('sampleApp', ['ui.router'])
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'dist/templates/home.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'dist/templates/about.html'
        })

}]);
