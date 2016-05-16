shoppingCart.controller('ProductController', [ '$scope', '$interval', '$http', '$location' ,'$cookieStore' ,function($scope, $interval, $http, $location, $cookieStore) {
    $scope.errorProduct = false;
    $scope.welcomeUserTab = false;
    $scope.loginRegisterTab = true;
    $scope.headerCategories = true;
    $scope.productList = false;
    $scope.params = {};
    $scope.loadMoreButton = false;
    $scope.searching = false;
    $scope.nonEmptyCart = false;
    $scope.emptyCart = true;
    $scope.addedProductSuccessfully = false;
    $scope.errorAddingProduct = false;
    $scope.productLoadingSpin = false;

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
            $scope.failureRegister = true;
        });
    }
    $scope.models = {};
    $scope.cartInfo = {};
    /*$scope.cartInfo.title = "custom title";
    $scope.cartInfo.quantity = "(1)";*/


    //setting number of prodcuts for cart

    $scope.getProductQuantity = function(){

        var urlProductCount = __env.apiUrl + "/products/" + $cookieStore.get('userid') + "/count";
        $http({
                method: 'GET',
                url: urlProductCount,
                headers: {'token': $cookieStore.get('token') },
            }).success(function(data){
                
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

    $scope.limit = 9;
    counter = 0;
    $scope.productList = true;
    $scope.searchProduct = function(query){
        $scope.productLoadingSpin = true;
        console.log($scope.params);
        console.log("called sp");
    	var urlPrefix = "http://open.api.ebay.com/shopping?" +
                        "callbackname=JSON_CALLBACK&callname=FindPopularItems&" + 
                        "responseencoding=JSON&" + 
                        "MaxEntries=50&" +
                        "appid=HemilPar-Shopping-PRD-a2f839365-478878d5&siteid=0&" + 
                        "QueryKeywords=";
        
    	var urlVer = "&version=713";
        console.log($scope.params.searchStr);
        console.log(query);
    	var url = urlPrefix + "" + $scope.params.searchStr + "" + urlVer;

        if(query instanceof Object){
            url = urlPrefix + "" + $scope.params.searchStr + "" + urlVer;
        }else{
            url = urlPrefix + "" + query + "" + urlVer;
        }

    	$http({
            method: 'JSONP',
            url: url
        }).success(function (data) {
            //$scope.restaurants = data;
            console.log(data);
            $scope.errorProduct = false;
            if(data.Ack == "Failure") {
                $scope.productLoadingSpin = false;
                $scope.products = null;
                $scope.productList = false;
                $scope.loadMoreButton = false;
                $scope.errorProduct = true;
            } else {
                $scope.productLoadingSpin = false;
                $scope.productList = true;
                $scope.loadMoreButton = true;
                $scope.errorProduct = false;
                $scope.products = data.ItemArray.Item;
            }
            
        }).error(function(err){
            console.log(err);
            /*$location.path("/" + "login");*/
        });

    };

    $scope.searchProduct('car');

    $scope.shortenProductName = function(pName){

        pName = substr(pName,0,50);
        if(pName.length > 50){
            return pName + "...";
        }else{
            return pName;
        }
    };

    $scope.loadMore = function() {
        $scope.limit = $scope.limit + 9;
    }


    $scope.addProduct = function(product) {

        var url = __env.apiUrl + "/products/" + $cookieStore.get('userid');

        console.log(product);
        console.log(product.ItemID);
/*        console.log(data.picUrl);
        console.log(data.pPrice);
        console.log(data.pTitle);
*/
        productData = {
                       "product":{
                                    "name":product.Title,
                                    "price":product.ConvertedCurrentPrice.Value,
                                    "category":product.PrimaryCategoryName,
                                    "imageurl":product.GalleryURL,
                                    "id":product.ItemID
                                 }
                      };
        $http({
            method: 'POST',
            url: url,
            headers: {'token': $cookieStore.get('token') },
            data: productData
        }).success(function(data){

            if(data['saved'] == "true"){
                console.log("saved product");
                
                $scope.addedProductSuccessfully = true;
                $scope.scrollTo( ".addedProductSuccessfully");
                /*focus('addedProductSuccessfully');*/
                $scope.errorAddingProduct = false;
                $scope.getProductQuantity();
            }else{
                $scope.addedProductSuccessfully = false;
                $scope.errorAddingProduct = true;
            }
        }).error(function(data){

        });
    };

    

    
}]);