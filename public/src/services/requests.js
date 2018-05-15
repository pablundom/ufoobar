app.service('$requests', function ($http) {

    this.get = function (uri,callback, options)
    {
        $http.get(uri,options).then(function (data) {
            callback(data);
        })
    };

    this.createFormData = function(data)
    {
        let result = new FormData();
        for(let k in data){
            if (data.hasOwnProperty(k)){
                if(typeof data[k]==="object"){
                    for(let k1 in data[k]){
                        if(data[k].hasOwnProperty(k1)){
                            for(let k2 in data[k][k1]){
                                if(data[k][k1].hasOwnProperty(k2)){
                                    result.append(`${k}[${k1}][${k2}]`,data[k][k1][k2]);
                                }
                            }
                        }
                    }
                    continue;
                }
                result.append(k,data[k]);
            }
        }

        return result;
    };

    this.post = function (uri,data,callback)
    {
        $http.post(uri,data, {
        }).then(function (data) {
            callback(data);
        })
    };


});