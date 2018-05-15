app.controller("Main", function ($scope) {

});

app.controller("AddSubject", function ($scope,$requests) {

    $scope.submit = function (form){
        console.log(form);
        $requests.post('/api/subject/add',form, function (data) {
            console.log(data);
        })
    }
});

app.controller("Subjects", function ($scope,subjects) {
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

});