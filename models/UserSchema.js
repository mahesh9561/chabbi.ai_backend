const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // Default role is user
    }
})

module.exports = mongoose.model('Users', UserSchema);