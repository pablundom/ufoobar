app.service("subjects", function ($requests) {

    this.all = function (callback) {
        $requests.get("api/subjects", function (data) {
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
    }
});