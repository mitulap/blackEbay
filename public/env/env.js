(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.apiUrl = 'http://team8elb-1269115631.us-west-2.elb.amazonaws.com:3000';
  //window.__env.apiUrl = 'http://52.36.183.143:3000';

  // Base url
  window.__env.baseUrl = '/';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = false;
}(this));