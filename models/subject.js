let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let markSchema = new Schema({
    mark: Number,
    student: {type: Schema.Types.ObjectId, ref: "Student"}
});

let examnSchema = new Schema({
    date:  { type: Date, default: Date.now },
    title: String,
        marks: [markSchema]
});

let subjectSchema = new Schema({
    name:  String,
    professor: String,
    departament:   String,
    examns: [examnSchema]
});


module.exports = mongoose.model('Subject', subjectSchema);
