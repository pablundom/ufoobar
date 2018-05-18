let express = require('express');
let subject = require('./api/subject');
let examn = require('./api/examn');
let student = require('./api/student');
let mark = require('./api/mark');
let router = express.Router();



router.use('/api/subject',subject);
router.use('/api/examn', examn);
router.use('/api/mark', mark);
router.use('/api/student', student);




module.exports = router;
