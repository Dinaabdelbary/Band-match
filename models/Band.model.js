const { Schema, model} = require('mongoose');
const Musician = require('./Musician.model');

const bandSchema = new Schema({

    bandname: {
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
    pendingRequests: { 
        type: Schema.Types.ObjectId
    },
    successfulMatch: {
        type: Schema.Types.ObjectId
    },
    notifications: {
        type: Schema.Types.Mixed
    },
    member: [{type: Schema.Types.ObjectId, ref:Musician}],
    lookingFor: [String],
    pendingRequests: { 
        type: Schema.Types.ObjectId
    },
    successfulMatch: {
        type: Schema.Types.ObjectId
    },
    notifications: {
        type: Schema.Types.Mixed
    }
});

const Band = model('Band', bandSchema);

module.exports = Band;