var app = angular.module('App', [
    'ngAnimate',
    'ngTouch',
    'ngResource',
    'ls.LiveSet',
    'ls.ChangeStream',
    'ui.router',
    'ui.bootstrap',
    'ui.select2',
    'bc.Flickity',
    'youtube-embed',
    'color.picker',
    'lbServices'
]);
app.config(function (LoopBackResourceProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
});
