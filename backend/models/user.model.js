const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    properties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
}) ;

module.exports = mongoose.model('User', UserSchema);
