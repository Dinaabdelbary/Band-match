const { Schema, model} = require('mongoose');
const Band = require('./Band.model');

const musicianSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "Username is required"],
        unique:true
    },
    password: {
        type:String,
        required: [true, "Password is required"]
    },
    email: {
        type:String,
        required: [true, 'Email is required.'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true
    },
    imageUrl:{
        type:String,
        // default: ///
    },
    band: [{type: Schema.Types.ObjectId, ref:Band}],
    lookingFor: [String],
    instruments:[String],
    mediaLinks:[String],
    description: String,
    genres:[String]
  },
  {
    timestamps: true
  }
);

const Musician = model('Musician', musicianSchema);

module.exports = Musician;