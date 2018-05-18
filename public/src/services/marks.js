app.service("marks", function ($requests) {

    this.all = function (id,callback) {
        $requests.get("api/mark/all?examn="+id, function (data) {
            callback(data.data);
        })
    };

    this.delete = function (id,examnId,callback) {
        $requests.get("api/mark/"+id+"/delete?examn="+examnId, function () {
            callback();
        })
    };

    this.get = function (id,examnId,callback) {
        $requests.get("api/mark/"+id+"?examn="+examnId, function (data) {
            callback(data.data);
        })
    };

    this.edit = function (id,examnId,data,callback) {
        $requests.post('/api/mark/'+id+'/edit?examn='+examnId,data, function (data) {
            callback(data);
        });
    };

    this.add = function (data,callback) {
        $requests.post('/api/mark/add',data, function (data) {
            callback(data);
        });
    }
});