
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