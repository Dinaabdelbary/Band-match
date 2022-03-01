const { Schema, model} = require('mongoose');

const musicianSchema = new Schema(
    {
        title:String,
        description: String,
        imageUrl: String
    },
    {
        timestamps: true
    }
);

const Musician = model('Musician', musicianSchema);

module.exports = Musician;