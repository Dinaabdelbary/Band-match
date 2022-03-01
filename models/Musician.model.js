const { Schema, model} = require('mongoose');
const Band = require('./Band.model');

const musicianSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String
    } ,
    band: [{type: Schema.Types.ObjectId, ref: Band}]
});

const Musician = model('Musician', musicianSchema);

module.exports = Musician;