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