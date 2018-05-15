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
    {
        route: "/subjects",
        options:
            {
                templateUrl : "subject/all",
                controller: "Subjects"
            }
    },
    {
        route: "/students",
        options:
            {
                templateUrl : "student/all",
                controller: "Students"
            }
    }
];
Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};

app.service('$requests', function ($http) {

    this.get = function (uri,callback, options)
    {
        $http.get(uri,options).then(function (data) {
            callback(data);
        })
    };

    this.createFormData = function(data)
    {
        let result = new FormData();
        for(let k in data){
            if (data.hasOwnProperty(k)){
                if(typeof data[k]==="object"){
                    for(let k1 in data[k]){
                        if(data[k].hasOwnProperty(k1)){
                            for(let k2 in data[k][k1]){
                                if(data[k][k1].hasOwnProperty(k2)){
                                    result.append(`${k}[${k1}][${k2}]`,data[k][k1][k2]);
                                }
                            }
                        }
                    }
                    continue;
                }
                result.append(k,data[k]);
            }
        }

        return result;
    };

    this.post = function (uri,data,callback)
    {
        $http.post(uri,data, {
        }).then(function (data) {
            callback(data);
        })
    };


});
app.service("students", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/students", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/student/"+id+"/delete", function () {
            callback();
        })
    };

    this.add = function (data,callback) {
        $requests.post('/api/student/add',data, function (data) {
            callback(data);
        });
    }
});
app.service("subjects", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/subjects", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/subject/"+id+"/delete", function () {
            callback();
        })
    };
    this.add = function (data,callback) {
        $requests.post('/api/subject/add',data, function (data) {
            callback(data);
        });
    }
});

app.controller("Main", function ($scope) {

});


app.controller("Subjects", function ($scope,subjects,$requests) {
    let update =  ()=>{
        subjects.all((data)=>{
            $scope.subjects = data;
        });
    };

    $scope.delete = (id) =>{
       subjects.delete(id,()=>{
           update();
       });

    };

    update();

    $scope.submit = function (form){
        subjects.add(form, function (data) {
            update();
        });
    }

});

app.controller("Students", function ($scope,students,subjects) {
    subjects.all((data)=>{
        $scope.subjects = data;
    });
    let update =  ()=>{
        students.all((data)=>{
            $scope.students = data;
        });
    };

    $scope.delete = (id) =>{
        students.delete(id,()=>{
            update();
        });

    };
    $scope.submit = (data)=>{
        console.log(data);
    };
    $scope.submit = function (form){
        students.add(form, function (data) {
            update();
        });
    };

    update();

});
