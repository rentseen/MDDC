/*****  main  *****/
appMain.controller('mainCtrl',function($scope){
	$scope.test="main";
	if(typeof($cookieStore.get('auth'))!='undefined'){
		window.location.href='/user';
	}
});