let express = require('express');
let router = express.Router();
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
    students.find({},function (err,students) {
        res.json(students);
    });

});

router.post('/add', function(req, res) {
    let data = req.body;
    let student = new students(data);
    student.save();
    res.send({"response": "OK"});

});

router.post('/:id/edit', function(req, res) {
    let id = req.params.id;
    let data = req.body;
    let model = students.findById(id, function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
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
    let model = students.findOne({_id: id}).populate('expedient.subjects').exec(function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        if(doc !==null){
            res.send(doc);
            return null;
        }
    });
});

router.get('/:id/delete', function(req, res) {
    let id = req.params.id;
    let model = students.findById(id, function (err,doc) {
        if (router.notFound(res,err,doc)) return true;
        if(doc !==null) doc.remove();
        res.send({"response": "OK"});
    });
});


module.exports = router;
