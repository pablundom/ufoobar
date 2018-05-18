let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render("index", {url: fullUrl});
});

router.get('*',function (req, res) {
    let fullUrl = req.protocol + '://' + req.get('host')+"/";
    res.render("index", {url: fullUrl});
});



module.exports = router;
