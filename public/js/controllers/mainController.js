shoppingCart.controller('MainController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {

    if(!(($cookieStore.get('token') != null) && ($cookieStore.get('userid') != null))){
        $location.path("/" + "login");
    }else{

        var url = __env.apiUrl + "/users/" + $cookieStore.get('userid') + "/authenticatesession";
        $http({
            method: 'GET',
            url: url,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            if(data['login'] == "true"){
                $location.path("/products");
            }else{
                $location.path("/login");
            }
        }).error(function(err){
            $location.path("/login");
            $scope.failureRegister = true;
        });

        
    }

    $scope.scrollTo = function(element) {
      $( 'html, body').animate({
        scrollTop: $(element).offset().top
      }, 2000);
    };

    $scope.logout = function(){
        
        $cookieStore.remove('token');
        $cookieStore.remove('userid');
        $location.path("/login");

        var url = __env.apiUrl + "/users/" + $cookieStore.get('userid') + "/logout";
        $http({
            method: 'PUT',
            url: url
        }).success(function(data){

            if(data['logout'] == "true"){
                console.log("logout");
                $cookieStore.remove('token');
                $cookieStore.remove('userid');
                $location.path("/login");
            }else{
                $cookieStore.remove('token');
                $cookieStore.remove('userid');
                $location.path("/login");
            }

        }).error(function(err){

        });
    };

    $scope.viewCart = function(){
        $location.path("/cart");
    };
}]);