let app = angular.module("App", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider){
    routes.forEach(function(a){
        if(typeof a.options.templateUrl !=="undefined"){
            a.options.templateUrl = `assets/templates/${a.options.templateUrl}.html`;
        }
        if(typeof a.options.controller !=="undefined"){
            a.options.controller = `${a.options.controller}`;
        }
        $routeProvider.when(a.route,a.options);
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    }, {reloadOnSearch: false});

    $locationProvider.html5Mode(true);

});
let routes =
[
  {
    route: "/",
    options:
    {
      templateUrl : "main",
      controller: "Main"
    }
  },
];
Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};


app.controller("Main", function ($scope) {

});
