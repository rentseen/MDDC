appLogin.controller('loginCtrl',function($scope,md5,$http,$cookieStore,notify){
	if(typeof($cookieStore.get('auth'))!='undefined'){
		window.location.href='/user';
	}
	$scope.nameNull=false;
	$scope.passwordNull=false;
	$scope.nameValidate=function(){
		$scope.nameNull=$scope.myForm.name.$error.required;
	}
	$scope.passwordValidate=function(){
		$scope.passwordNull=$scope.myForm.password.$error.required;
	}
	$scope.login=function(){
		if(!($scope.myForm.name.$error.required || $scope.myForm.password.$error.required)){
			var postData={name: $scope.name, password: md5.createHash($scope.password)};
			$http.post('api/login',postData).success(function(data, status, headers, config){
				if(data.status=='success'){
					$cookieStore.put('auth',data.auth);
					$cookieStore.put('username',$scope.name);
					window.location.href='/user';
				}
				else{
					notify({message:data.error,classes:'alert-danger',duration:13000,position:'right'});
				}
				
			}).error(function(data, status, headers, config){

			});
		}
		else{
			$scope.nameNull=$scope.myForm.name.$error.required;
			$scope.passwordNull=$scope.myForm.password.$error.required;
		}
	}
});