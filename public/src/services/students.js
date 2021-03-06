app.service("students", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/student/all", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/student/"+id+"/delete", function () {
            callback();
        })
    };

    this.get = function (id,callback) {
        $requests.get("api/student/"+id, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/student/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/student/add',data, function (data) {
            callback(data);
        });
    }
});