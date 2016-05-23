shoppingCart.controller('CartController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {
    $scope.loginRegisterTab = true;
    $scope.errorRemovingProduct = false;
    $scope.removeSuccessProduct = false;
    $scope.loginRequired = false;
    $scope.productList = false;
    $scope.cartSpinner = false;
    $scope.checkOutSuccess = false;
    $scope.noProductCO = false;

    console.log("cart controller");
    console.log("");
    if(!(($cookieStore.get('token') != null) && ($cookieStore.get('userid') != null))){
        console.log("login");
        $location.path("/" + "login");
    }else{
        var url = __env.apiUrl + "/users/" + $cookieStore.get('userid') + "/authenticatesession";
        $http({
            method: 'GET',
            url: url,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            //console.log("success");
            $scope.loginRequired = false;
            if(data['login'] == "true"){
                console.log("success");
            }else{
                console.log("fail");
                $location.path("/login");
            }
        }).error(function(err){
            console.log("error");
            $scope.failureRegister = true;
        });
    }
    $scope.cartInfo = {};
    $scope.getProductQuantity = function(){

        var urlProductCount = __env.apiUrl + "/products/" + $cookieStore.get('userid') + "/count";
        $http({
                method: 'GET',
                url: urlProductCount,
                headers: {'token': $cookieStore.get('token') },
            }).success(function(data){
                $scope.loginRequired = false;
                if(data['count'] > 0){
                    $scope.cartInfo.title = "Total products in cart";
                    $scope.cartInfo.quantity = "(" + data['count'] + ")";
                }else{
                    $scope.cartInfo.title = "Your Cart is Empty";
                    $scope.cartInfo.quantity = "(0)";
                }
            }).error(function(err){
                $scope.cartInfo.title = "Fail to get total products";
                $scope.cartInfo.quantity = "(-)";
        });
    };
    $scope.getProductQuantity();
    //method to get all products
    $scope.getAddedProducts = function(){
        $scope.loginRequired = false;
        $scope.cartSpinner = true;
        var urlGetProducts = __env.apiUrl + "/products/" + $cookieStore.get('userid');
        console.log(urlGetProducts);
        $http({
            method: 'GET',
            url: urlGetProducts,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            console.log(data);
            $scope.cartSpinner = false;
            $scope.productList = true;
            $scope.products = data.products;
            
        }).error(function(data){

        });

    };
    $scope.getAddedProducts();


    $scope.gotoProductPage = function(){
        $location.path("/products");
    };  

    $scope.removeProduct = function(product){
        $scope.cartSpinner = true;
        var deleteUrl = __env.apiUrl + /products/ + $cookieStore.get('userid') + "/" + product.productid;
        $scope.loginRequired = false;
        $http({
            method: 'DELETE',
            url: deleteUrl,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            console.log(data);
            if(data['delete'] == "true"){
                console.log("delete");
                $scope.removeSuccessProduct = true;
                $scope.scrollTo( ".addedProductSuccessfully");
                $scope.getAddedProducts();
                $scope.getProductQuantity();
                $scope.cartSpinner = false;
            }else{
                $scope.errorRemovingProduct = true;
                $scope.cartSpinner = false;
                $scope.scrollTo( ".addedProductSuccessfully");

            }
            
        }).error(function(data){

        });

    };

    $scope.checkOut = function(){

        $scope.cartSpinner = true;
        $scope.errorRemovingProduct = false;
        $scope.removeSuccessProduct = false;
        $location.path("/finalCheckout");

    };

    $scope.removeProductCO = function(product){
        $scope.cartSpinner = true;
        var deleteUrl = __env.apiUrl + /products/ + $cookieStore.get('userid') + "/" + product.productid;
        $scope.loginRequired = false;
        $http({
            method: 'DELETE',
            url: deleteUrl,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            console.log(data);
            if(data['delete'] == "true"){
                console.log("delete");
                $scope.scrollTo( ".addedProductSuccessfully");
                $scope.getAddedProducts();
                $scope.getProductQuantity();
                $scope.cartSpinner = false;
            }else{
                $scope.errorRemovingProduct = true;
                $scope.cartSpinner = false;
                $scope.scrollTo( ".addedProductSuccessfully");

            }
            
        }).error(function(data){

        });

    };

    $scope.removeItem = function(itemId){

    };

    $scope.searchProduct = function(){
        $scope.loginRequired = true;
    };
}]);
