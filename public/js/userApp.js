var appUser = angular.module("User", ["ui.router","ngCookies"]);
appUser.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise("/main");

	$stateProvider
		.state("main",{
			url:"/main",
			templateUrl: "/html/userMain.html",
			controller: 'userMain'
		})
});