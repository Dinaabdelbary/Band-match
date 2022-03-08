const { Schema, model} = require('mongoose');
const Musician = require('./Musician.model');

const bandSchema = new Schema({
    genre: {
        type: [String],
        required: false,
    },
    mediaLinks: {
        type:[String]
    },
    description: {
        type:String,
        required:false
    },
    imageUrl:{
        type:String,
        // default: ///
    },
    member: [{type: Schema.Types.ObjectId, ref:Musician}],
    lookingFor: [String]
});

const Band = model('Band', bandSchema);

module.exports = Band;