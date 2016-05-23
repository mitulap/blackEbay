shoppingCart.filter('shortenProductName', function() {
  return function(Title) {

    pName = substr(pName,0,50);

    if(pName.length > 50){

        return pName + "...";
    }else{

        return pName;
    }
  };
});

shoppingCart.filter('changeThumbURL', function() {
    return function(url) {
        
        var newUrl = url.replace("8080","4040");

        return newUrl;
    };
});

shoppingCart.filter('setDecimal', function ($filter) {
    return function (input, places, quantity) {
        if (isNaN(input)) return (input * quantity);

        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor * quantity)/factor;
    };

});
