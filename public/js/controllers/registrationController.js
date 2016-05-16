shoppingCart.controller('RegistrationController', ['$scope', '$http', '$location' ,'$cookieStore', function($scope, $http, $location, $cookieStore) {
    
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.SuccessRegister = false;
    $scope.welcomeUserTab = true;
    $scope.loginRegisterTab = false;
    $scope.failureRegister = false;

    if((($cookieStore.get('token') != null) && ($cookieStore.get('userid') != null))){
            var url = __env.apiUrl + "/users/" + $cookieStore.get('userid') + "/authenticatesession";
        $http({
            method: 'GET',
            url: url,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            if(data['login'] == "true"){
                $location.path("/products");
            }
        }).error(function(err){
            $scope.failureRegister = true;
        });
    }
    
    $scope.register = function() {

        $scope.failureRegister = false;
        $scope.SuccessRegister = false;
        console.log("Registration Has been Successfully called");
        
        var url = __env.apiUrl + "/users";
        var requestData =   {
                                "user": {
                                    "username": $scope.params.username,
                                    "password":$scope.params.password,
                                    "email":$scope.params.email,
                                    "phone": $scope.params.phone,
                                    "address":$scope.params.address
                                }
                            }

        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: requestData
        }).success(function (data) {
            $scope.restaurants = data;
            
            
            if(data['saved'] == 'true'){
                $scope.SuccessRegister = true;
            }else{
                $scope.failureRegister = true;
            }
            
        }).error(function(err){
            $scope.failureRegister = true;
        });

    };

    $scope.login = function(){
        $location.path("/" + "login");
    }

}]);