
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

