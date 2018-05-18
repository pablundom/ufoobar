app.service("examns", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/examn/all", function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,callback) {
        $requests.get("api/examn/"+id+"/delete", function () {
            callback();
        })
    };

    this.get = function (id,callback) {
        $requests.get("api/examn/"+id, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,data,callback) {
        $requests.post('/api/examn/'+id+'/edit',data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/examn/add',data, function (data) {
            callback(data);
        });
    }
});