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