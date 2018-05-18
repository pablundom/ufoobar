let express = require('express');
let router = express.Router();
let subjects = require('../models/subject');

router.notFound = function (res,err,doc) {
    if(err || doc===null){
        res.status(404).send({"response": "Not Found"});
        return true;
    }
    return false;
};

router.get('/all', function(req, res) {
    let result = [];
    subjects.find({},function (err,users) {
        let result = [];
        users.forEach((v)=>{
            v.examns.forEach((x)=>{
                x = x.toObject();
                x.subject = v.name;
                result.push(x);
            })
        });
        res.json(result);
    });

});

router.post('/add', function(req, res) {
    let data = req.body;
    let subjectId = data.subject;
    subjects.findOne({"_id": subjectId},function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        doc.examns.push(data);
        doc.save();
        res.send({"response": "OK"});
    });

});

router.post('/:id/edit', function(req, res) {
    let id = req.params.id;
    let data = req.body;
    let model = subjects.findOne({"examns._id": id},function (err,doc) {
        doc = doc.examns.forEach(function (a){
            if(a._id.toString()===id){
                a.set(data);
                doc.save();
                res.send({"response": "OK"});
            }
        });
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    let model = subjects.findOne({"examns._id": id},function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        doc = doc.examns.forEach(function (a){
            if(a._id.toString()===id){
                a = a.toObject();
                a.subject = doc.name;
                res.send(a);
            }
        });
        if(!res.headersSent){
            res.status(404).send({"response": "Not Found"});
        }
    });
});

router.get('/:id/delete', function(req, res) {
    let id = req.params.id;
    let model = subjects.findOne({"examns._id": id},function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        let examen = doc.examns.find((a)=>{return a._id.toString()===id});
        examen.remove();
        doc.save();
        res.send({"response": "OK"});
    });
});



module.exports = router;