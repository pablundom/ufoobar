let express = require('express');
let router = express.Router();
let students = require('../models/student');
let subjects = require('../models/subject');


router.notFound = function (res,err,doc) {
    if(err || doc===null){
        res.status(404).send({"response": "Not Found"});
        return true;
    }
    return false;
};

router.get('/all', function(req, res) {
    let id = req.query.examn;
    subjects.findOne({"examns._id": id}).populate("examns.marks.student").exec(function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        let marks = [];
        let examn = doc.examns.id(id);
        examn.marks.forEach((m)=>{
            m = m.toObject();
            m.subject = doc.name;
            m.examn = examn.title;
            marks.push(m);
        });
        res.json(marks);
    });

});

router.post('/add', function(req, res) {
    let data = req.body;
    let examnId = req.body.examn;
    subjects.findOne({"examns._id": examnId},function (err,obj) {
        let examn = obj.examns.id(examnId);
        examn.marks.push(data);
        obj.save();
        res.send({"response": "OK"});
    });

});

router.post('/:id/edit', function(req, res) {
    let id = req.params.id;
    let examnId = req.query.examn;
    let data = req.body;
    let model = subjects.findOne({"examns._id": examnId}).populate("examns.marks.student").exec(function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        try{
            let examn = doc.examns.id(examnId);
            let mark = examn.marks.id(id);
            mark.set(data);
            doc.save();
            res.send({"response": "OK"});
        } catch (E){
            res.status(404).send({"response": "Not Found"});
            return false;
        }
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    let examnId = req.query.examn;
    let model = subjects.findOne({"examns._id": examnId}).populate("examns.marks.student").exec(function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        try{
            let examn = doc.examns.id(examnId);
            console.log(doc);
            let mark = examn.marks.id(id);
            res.send(mark);
        } catch (E){
            res.status(404).send({"response": "Not Found"});
            return false;
        }
    });
});

router.get('/:id/delete', function(req, res) {
    let id = req.params.id;
    let examnId = req.query.examn;
    let model = subjects.findOne({"examns._id": examnId}).populate("examns.marks.student").exec(function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        try{
            let examn = doc.examns.id(examnId);
            let mark = examn.marks.id(id);
            mark.remove();
            doc.save();
            res.send({"response": "OK"});
        } catch (E){
            res.status(404).send({"response": "Not Found"});
            return false;
        }
    });
});



module.exports = router;