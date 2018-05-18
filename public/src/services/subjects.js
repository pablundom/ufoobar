app.service("subjects", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/subject/all", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/subject/"+id+"/delete", function () {
            callback();
        })
    };
    this.add = function (data,callback) {
        $requests.post('/api/subject/add',data, function (data) {
            callback(data);
        });
    };

    this.get = function (id,callback) {
        $requests.get("api/subject/"+id, function (data) {
            callback(data.data);
        })
    };

    this.getStudents = function (id,callback) {
        $requests.get("api/subject/"+id+"/students", function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/subject/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };
});