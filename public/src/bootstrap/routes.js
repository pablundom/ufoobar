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
      route: "/subject/add",
        options:
            {
                templateUrl: "subject/add",
                controller: "AddSubject"
            }
    },
    {
        route: "/subjects",
        options:
            {
                templateUrl : "subject/all",
                controller: "Subjects"
            }
    }
];