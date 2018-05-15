app.service("students", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/students", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/student/"+id+"/delete", function () {
            callback();
        })
    };

    this.add = function (data,callback) {
        $requests.post('/api/student/add',data, function (data) {
            callback(data);
        });
    }
});