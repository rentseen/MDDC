/*****  join  *****/
appJoin.controller('joinCtrl',function($scope,md5,$http,$cookieStore,notify){
	if(typeof($cookieStore.get('auth'))!='undefined'){
		window.location.href='/user';
	}
	$scope.emailNull=false;
	$scope.emailInvalid=false;
	$scope.nameNull=false;
	$scope.passwordNull=false;
	$scope.mailValidate=function(){
		$scope.emailNull=$scope.myForm.mail.$error.required;
		$scope.emailInvalid=$scope.myForm.mail.$error.email;
	}
	$scope.nameValidate=function(){
		$scope.nameNull=$scope.myForm.name.$error.required;
	}
	$scope.passwordValidate=function(){
		$scope.passwordNull=$scope.myForm.password.$error.required;
	}
	$scope.join=function(){
		if(!($scope.myForm.mail.$error.required || $scope.myForm.mail.$error.email || $scope.myForm.name.$error.required || $scope.myForm.password.$error.required)){
			var postData={name: $scope.name, mail: $scope.mail, password: md5.createHash($scope.password)};
			$http.post('api/join',postData).success(function(data, status, headers, config){
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
			$scope.emailNull=$scope.myForm.mail.$error.required;
			$scope.emailInvalid=$scope.myForm.mail.$error.email;
			$scope.nameNull=$scope.myForm.name.$error.required;
			$scope.passwordNull=$scope.myForm.password.$error.required;
		}
	}
});