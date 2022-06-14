const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['house', 'flat'],
        default: 'house'
    },
    furnishing: {
        type: String,
        required: true,
        enum: ['fully-furnished', 'semi-furnished', 'unfurnished'],
        default: 'fully-furnished'
    },
    rooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    forRent: {
        type: Boolean,
        required: true
    },
    available: {
        from: { type: Date },
        to: { type: Date },
        required: this.forRent === true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }]
});

module.exports = mongoose.model('Property', PropertySchema);
