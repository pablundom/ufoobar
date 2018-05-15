let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let studentSchema = new Schema({
    name:  String,
    surnames: String,
    dni:   String,
    email: String,
    phone: String,
    expedient: {
        grade: String,
        age: String,
        subjects: [{type: Schema.Types.ObjectId, ref: "Subject"}]
    }
});

module.exports =  mongoose.model('Student', studentSchema);