let express = require('express');
let router = express.Router();
let subjects = require('../models/subject');
let students = require('../models/student');

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
        res.json(users);
    });

});

router.post('/add', function(req, res) {
    let data = req.body;
    let subject = new subjects(data);
    subject.save();
    res.send({"response": "OK"});
});


router.get('/:id/delete', function(req, res) {
    let id = req.params.id;
    let model = subjects.findById(id, function (err,doc) {
        router.notFound(res,err);
        if(doc !==null) doc.remove();
        res.send({"response": "OK"});
    });
});
router.post('/:id/edit', function(req, res) {
    let id = req.params.id;
    let data = req.body;
    let model = subjects.findById(id, function (err,doc) {
        router.notFound(res,err);
        if(doc !==null){
            doc.set(data);
            doc.save();
            res.send({"response": "OK"});
            return null;
        }
    });
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    let model = subjects.findById(id, function (err,doc) {
        router.notFound(res,err);
        if(doc !==null){
            res.send(doc);
            return null;
        }
    });
});

router.get('/:id/students', function (req, res) {
    let id = req.params.id;
    subjects.findById(id, (err,doc)=>{
        router.notFound(res,err);
        students.find({"expedient.subjects":id}, function (err,doc2) {
            router.notFound(res,err);
            doc = doc.toObject();
            doc.students = doc2;
            res.send(doc);
        })
    })

});

module.exports = router;