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