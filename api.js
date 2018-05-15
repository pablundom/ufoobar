let express = require('express');
let router = express.Router();


// Aquí se definirán las rutas de la API, se llamará a la base de datos de mongo y se atenderá a las peticiones
router.get('/subjects', function(req, res) {
    res.send({"test":"jeje"});
});



module.exports = router;
