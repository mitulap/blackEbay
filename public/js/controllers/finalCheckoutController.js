shoppingCart.controller('FinalCheckoutController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore', '$timeout' ,function($scope, $interval, $http, $location, $cookieStore, $timeout) {

    $scope.loginRegisterTab = true;
    $scope.errorRemovingProduct = false;
    $scope.removeSuccessProduct = false;
    $scope.loginRequired = false;
    $scope.productList = false;
    $scope.cartSpinner = false;
    $scope.checkOutSuccess = false;
    $scope.noProductCO = false;
    $scope.timerCO = false;
    $scope.finalCheckOutPage = false;
    $scope.sessionErrorMsg = false;
    $scope.dataErrorMsg = false;

    $scope.counter = 60;

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
            }else{
                $location.path("/login");
            }
        }).error(function(err){
            $scope.failureRegister = true;
        });
    }


    $scope.validateCheckoutSession = function(){
        

        var validateCOSession = __env.apiUrl + "/products/" + $cookieStore.get('userid') + "/checkout";


        $http({
            method: 'POST',
            url : validateCOSession
        }).success(function(data){
            console.log(data);
            console.log(data['sessionIsActive']);

            if( data['sessionIsActive'] == "false" ){
                //$scope.updateTimerFunc();
                $scope.finalCheckOutPage = true;
                $scope.timerCO = true;
                $scope.getAddedProducts();
            }else{
                $scope.finalCheckOutPage = false;
                //$scope.redirectToCheckOutPage();
                $scope.timerCO = false;
                $scope.sessionErrorMsg = true;
                //$scope.redirectToCheckOutPage();
            }
        }).error(function(err){

        });

    };
    $scope.validateCheckoutSession();

    $scope.redirectToCheckOutPage = function(){
        $timeout(function() {
          $location.path("/products");
          }, 5000);
    };

    $scope.updateTimerFunc = function(){
        $timeout(function() {
          $scope.counter--;
          $scope.updateTimerFunc();
          if($scope.counter == 0){
            $location.path("/products");
          }
          }, 1000);
    };



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


    $scope.getAddedProducts = function(){
        $scope.loginRequired = false;
        $scope.cartSpinner = true;
        var urlGetProducts = __env.apiUrl + "/products/" + $cookieStore.get('userid');
        console.log(urlGetProducts);
        var data1, data2;


        $http({
            method: 'GET',
            url: urlGetProducts,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            console.log(data);
            data1 = data;
            console.log(data1.products.length);
            console.log(data1['ip']);
            $scope.cartSpinner = false;
            $scope.productList = true;
            $scope.products = data.products;

                        

            $http({
                    method: 'GET',
                    url: urlGetProducts,
                    headers: {'token': $cookieStore.get('token') },
                }).success(function(data){
                    console.log(data);
                    data2 = data;
                    console.log("data2");
                    console.log(data2.products.length);
                    console.log(data2['ip']);


                    if(data1.products.length == data2.products.length){
                        $scope.cartSpinner = false;
                        $scope.productList = true;
                        $scope.products = data.products;    
                        $scope.finalCheckOutPage = true;
                        $scope.timerCO = true;
                        $scope.updateTimerFunc();
                                    
                    }else{
                        $scope.dataErrorMsg = true;
                        $scope.productList = false;
                        $scope.finalCheckOutPage = false;
                        $scope.redirectToCheckOutPage();
                    }

                    console.log("Done while");

                    

                }).error(function(data){
                    
                });

            

            }).error(function(data){
            
        });

            
            //end

         /*   $scope.finalCheckOutPage = true;
                $scope.timerCO = true;*/
    };


        
    //$scope.getAddedProducts();

    $scope.checkOut = function(){

        $scope.cartSpinner = true;
        $scope.errorRemovingProduct = false;
        $scope.removeSuccessProduct = false;
        $location.path("/finalCheckout");
        var urlGetProducts = __env.apiUrl + "/products/" + $cookieStore.get('userid');
        console.log(urlGetProducts);
        $http({
            method: 'GET',
            url: urlGetProducts,
            headers: {'token': $cookieStore.get('token') },
        }).success(function(data){
            console.log(data);
            //$scope.productList = true;
            //$scope.products = data.products;
            if(data.products.length == 0){
                $scope.noProductCO = true;
                $scope.scrollTo( ".addedProductSuccessfully");
                $scope.cartSpinner = false;
                $scope.checkOutSuccess = false;
            }else{
                for(var i=0; i < data.products.length; i++){
                    $scope.removeProductCO(data.products[i]);
                }
                $scope.getAddedProducts();
                $scope.getProductQuantity();
                $scope.cartSpinner = false;
                $scope.checkOutSuccess = true;
                $scope.scrollTo( ".addedProductSuccessfully");
            }
        }).error(function(data){

        });

         $timeout(function() {
          $location.path("/products");
          }, 3000);
        
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

    $scope.removeProduct = function(products) {
        $location.path("/cart");
    }

    $scope.viewCart = function(){
        $location.path("/cart");
    };


    $scope.logout = function(){
        
        $cookieStore.remove('token');
        $cookieStore.remove('userid');
        $cookieStore.remove('admin');
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
            }/*else{
                $cookieStore.remove('token');
                $cookieStore.remove('userid');
                $location.path("/login");
            }*/

        }).error(function(err){

        });
    };
}]);