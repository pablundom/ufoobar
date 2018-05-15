let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let subjects = require('./models/subject');

// Aquí se definirán las rutas de la API, se llamará a la base de datos de mongo y se atenderá a las peticiones
router.get('/subjects', function(req, res) {
    let result = [];
    subjects.find({},function (err,users) {
        res.json(users);
    });

});


router.post('/subject/add', function(req, res) {
    let data = req.body;
    let subject = new subjects(data);
    subject.save();
    res.send({"response": "OK"});
});


router.get('/subject/:id/delete', function(req, res) {
    let id = req.params.id;
    let model = subjects.findById(id, function (err,doc) {
        if(err){
            res.status(404).send({"response": "Not found"});
            return null;
        }
        if(doc !==null) doc.remove();
        res.send({"response": "OK"});
    });
});

module.exports = router;
