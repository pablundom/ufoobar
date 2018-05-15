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