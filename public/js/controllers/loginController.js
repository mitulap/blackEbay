shoppingCart.controller('SignInController', ['$scope', '$http', '$location' ,'$cookieStore', '__env', function($scope, $http, $location, $cookieStore, __env) {

    $scope.headerCategories = false;
    $scope.welcomeUserTab = true;
    $scope.loginRegisterTab = false;
    $scope.loginRequired = false;
    $scope.loadingProbl = false;
/*    if($cookieStore.get('isAuth') == true){
        console.log("product");
        $location.path('/products');
    }*/

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
    $scope.searching = true;
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.errorLogin = false;
    $scope.signin = function() {
        $scope.loginRequired = false;
        $scope.uName = $scope.username;

        $scope.searching = true;
        var loginData = {
                            "username": $scope.params.username,
                            "password": $scope.params.password
                        };

        var url = __env.apiUrl + "/users/login";
        $scope.loadingProbl = true;
        $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json'},
            data: loginData
        }).success(function (data) {
            console.log("success");
            $scope.searching = false;
            $cookieStore.put('token', data['token']);
            $cookieStore.put('userid', data['userid']);
            $location.path("/" + "main");
            $scope.loadingProbl = false;
            
        }).error(function(err){
            $scope.loadingProbl = false;
            $scope.searching = false;
            $scope.errorLogin = true;
            //$location.path("/" + "login");
        });
    };


    $scope.register = function(){
        $scope.loginRequired = false;
        $location.path("/" + "register");
    }
    $scope.searchProduct = function(){
        $scope.loginRequired = true;
    }

}]);