
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