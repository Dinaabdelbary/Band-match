const { Schema, model} = require('mongoose')

const bandSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
});

const Band = model('Band', bandSchema);

module.exports = Band;