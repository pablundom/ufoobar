let app = angular.module("App", ["ngRoute","angular-loading-bar","ngAnimate"]);


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
        route: "/subject/:id/edit",
        options:
            {
                templateUrl : "subject/edit",
                controller: "EditSubject"
            }
    },
    {
        route: "/subject/:id/examns",
        options:
            {
                templateUrl : "examn/all",
                controller: "SubjectExamns"
            }
    },
    {
        route: "/subject/:id/students",
        options:
            {
                templateUrl : "student/all",
                controller: "SubjectStudents"
            }
    },
    {
        route: "/students",
        options:
            {
                templateUrl : "student/all",
                controller: "Students"
            }
    },
    {
        route: "/student/:id/edit",
        options:
            {
                templateUrl : "student/edit",
                controller: "EditStudent"
            }
    },
    {
        route: "/examns",
        options:
            {
                templateUrl : "examn/all",
                controller: "Examns"
            }
    },
    {
        route: "/examn/:id/edit",
        options:
            {
                templateUrl : "examn/edit",
                controller: "EditExamn"
            }
    },
    {
        route: "/examn/:id/marks",
        options:
            {
                templateUrl : "mark/all",
                controller: "Marks"
            }
    },
    {
        route: "/mark/:id/edit",
        options:
            {
                templateUrl : "mark/edit",
                controller: "EditMark"
            }
    },
];
Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};

app.service("examns", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/examn/all", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/examn/"+id+"/delete", function () {
            callback();
        })
    };

    this.get = function (id,callback) {
        $requests.get("api/examn/"+id, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/examn/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/examn/add',data, function (data) {
            callback(data);
        });
    }
});
app.service("marks", function ($requests) {

    this.all = function (id,callback) {
        $requests.get("api/mark/all?examn="+id, function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,examnId,callback) {
        $requests.get("api/mark/"+id+"/delete?examn="+examnId, function () {
            callback();
        })
    };

    this.get = function (id,examnId,callback) {
        $requests.get("api/mark/"+id+"?examn="+examnId, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,examnId,data,callback) {
        $requests.post('/api/mark/'+id+'/edit?examn='+examnId,data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/mark/add',data, function (data) {
            callback(data);
        });
    }
});
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
        $requests.get("api/student/all", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/student/"+id+"/delete", function () {
            callback();
        })
    };

    this.get = function (id,callback) {
        $requests.get("api/student/"+id, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/student/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/student/add',data, function (data) {
            callback(data);
        });
    }
});
app.service("subjects", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/subject/all", function (data) {
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
    };

    this.get = function (id,callback) {
        $requests.get("api/subject/"+id, function (data) {
            callback(data.data);
        })
    };

    this.getStudents = function (id,callback) {
        $requests.get("api/subject/"+id+"/students", function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/subject/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };
});

app.controller("Main", function ($scope) {

});




app.controller("EditExamn", function ($scope,students,$routeParams,$location,subjects,examns) {
    let id = $routeParams.id;
    $scope.editing = true;
    examns.get(id,(a)=>{
       $scope.data = a;
       $scope.data.date = new Date(a.date);
    });
    $scope.submit = function (form){
        examns.edit(id,form, function (data) {
            $location.path('/examns');
        });
    };
    subjects.all((data)=>{
        $scope.subjects = data;
    });

});

app.controller("Examns", function ($scope,students,subjects,examns) {
    $scope.title = "Todos los examenes";
    $scope.update = function (){
        examns.all((data)=>{
            $scope.examns = data;
        });
    };
    $scope.delete = (id) =>{
        examns.delete(id,()=>{
            $scope.update();
        });

    };
    $scope.submit = function (form){
        examns.add(form, function (data) {
            $scope.update();
        });
    };
    subjects.all((data)=>{
        $scope.subjects = data;
    });

    $scope.update();

});


app.controller("SubjectExamns", function ($scope,students,subjects,$controller,$routeParams,examns) {
    let id = $routeParams.id;
    $scope.update = ()=>{
        subjects.get(id,(data)=>{
            $scope.title = "Examenes de "+data.name;
            $scope.examns = data.examns;
            $scope.examns.forEach((v,k,a)=>{
                v.subject = data.name;
            })
        })
    };
    $scope.delete = (id) =>{
        examns.delete(id,()=>{
            $scope.update();
        });

    };
    $scope.submit = function (form){
        examns.add(form, function (data) {
            $scope.update();
        });
    };
    subjects.all((data)=>{
        $scope.subjects = data;
    });

    $scope.update();
});

app.controller("EditMark", function ($scope,students,$routeParams,$location,subjects,examns,marks) {
    let id = $routeParams.id;
    $scope.editing = true;
    let examnId = $location.search().examn;
    $scope.editing = true;
    marks.get(id,examnId,(a)=>{
       $scope.data = a;
       $scope.data.date = new Date(a.date);
    });
    $scope.submit = function (form){
        marks.edit(id,examnId,form, function (data) {
            $location.path('/examn/'+examnId+'/marks');
            $location.search('');
        });
    };
    students.all((data)=>{
        $scope.students = data;
    });

});

app.controller("Marks", function ($scope,students,subjects,examns,$routeParams,marks) {
    $scope.title = "Notas";
    let examnId = $routeParams.id;
    $scope.data = {};
    $scope.update = function (){
        marks.all(examnId,(data)=>{
            $scope.marks = data;
        });
    };
    $scope.delete = (id) =>{
        marks.delete(id,examnId,()=>{
            $scope.update();
        });
    };

    examns.get(examnId,function (data) {
        $scope.title = `Notas del examen "${data.title}"`;
        $scope.data.examn = data._id;
    });

    $scope.submit = function (form){
        marks.add(form, function (data) {
            $scope.update();
        });
    };
    students.all((data)=>{
        $scope.students = data;
    });

    $scope.update();

});



app.controller("EditStudent", function ($scope,students,$routeParams,$location,subjects) {
    let id = $routeParams.id;
    let getStudent =  ()=>{
        students.get(id,(data)=>{
            $scope.data = data;
        });
    };
    $scope.delete = (id) =>{
        students.delete(id,()=>{
            update();
        });

    };
    $scope.submit = function (form){
        students.edit(id,form, function (data) {
            $location.path("/students");
        });
    };
    subjects.all((data)=>{
        $scope.subjects = data;
    });


    getStudent();

});

app.controller("Students", function ($scope,students,subjects) {
    $scope.title = "Alumnos";
    subjects.all((data)=>{
        $scope.subjects = data;
    });
    if(typeof $scope.update==="undefined")
    $scope.update =  ()=>{
        students.all((data)=>{
            $scope.students = data;
        });
    };

    $scope.delete = (id) =>{
        students.delete(id,()=>{
            $scope.update();
        });

    };
    $scope.submit = function (form){
        students.add(form, function (data) {
            $scope.update();
        });
    };

    $scope.update();

});


app.controller("SubjectStudents", function ($scope,students,subjects,$controller,$routeParams) {
    let id = $routeParams.id;
    $scope.update = ()=>{
        subjects.getStudents(id, (data)=>{
            $scope.students = data.students;
            $scope.title = "Alumnos de "+data.name;
        })
    };
    angular.extend(this, $controller('Students', {$scope: $scope}));
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

    $scope.submit = function (form){
        subjects.add(form, function (data) {
            update();
        });
    };

    update();
});

app.controller("EditSubject", function ($scope,students,$routeParams,$location,subjects) {
    let id = $routeParams.id;
    let getSubject =  ()=>{
        subjects.get(id,(data)=>{
            $scope.data = data;
        });
    };

    $scope.submit = function (form){
        subjects.edit(id,form, function (data) {
            $location.path("/subjects");
        });
    };
    subjects.all((data)=>{
        $scope.subjects = data;
    });


    getSubject();

});
