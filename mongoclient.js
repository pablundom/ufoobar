let mongoose = require('mongoose');
let url = "mongodb://admin:admin@ds119070.mlab.com:19070/cbd2018";

this.connect = (callback)=>{
    mongoose.connect(url);
    let db = mongoose.connection;
    db.once('open',callback);
};


module.export = this;