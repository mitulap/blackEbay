//this is where we will enter routes for application

var __env = {};

var shoppingCart = angular.module('shoppingCart', ['chart.js', 'ngRoute', 'ngAnimate', 'uiSwitch','ngCookies'])

    .config(function ($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'login.html',
        controller: 'SignInController'
    }).
    when('/products', {
        templateUrl: 'products2.html',
        controller: 'ProductController'
    }).
    when('/products1', {
        templateUrl: 'products2.html',
        controller: 'ProductController'
    }).
    when('/register', {
        templateUrl: 'register.html',
        controller: 'RegistrationController'
    }).
    when('/cart', {
        templateUrl: 'cart.html',
        controller: 'CartController'
    }).
    when('/#/cart', {
        templateUrl: 'cart.html',
        controller: 'CartController'
    }).
    when('/finalCheckout', {
        templateUrl: 'finalCart.html',
        controller: 'FinalCheckoutController'
    }).
    when('/', {
        templateUrl: 'products2.html',
        controller: 'ProductController'
    }).
    otherwise({redirectTo: '/'});
});

shoppingCart.constant('__env',__env);

