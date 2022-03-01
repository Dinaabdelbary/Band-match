const { Schema, model} = require('mongoose')

const bandSchema = new Schema({
    name: String,
    genre: String,
    country: String,
    imageUrl: String

},
    {
        timestamps:true
    }
);

const Band = model('Band', bandSchema);

module.exports = Band;