let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let subjectSchema = new Schema({
    name:  String,
    professor: String,
    departament:   String,
    examns: [
        {
            date:  { type: Date, default: Date.now },
            title: String,
            marks:
                [
                    {
                        mark: Number,
                        student: {type: Schema.Types.ObjectId, ref: "Student"}
                    }
                ]
        }
    ]
});


module.exports = mongoose.model('Subject', subjectSchema);
