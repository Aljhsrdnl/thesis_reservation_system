const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length must be 6 characters"]
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    // if student, teacher, or outside researcher
    status: { 
        type: String,
        required: [true, "Please enter your status."]
    },
    id: {
        type: String,
        required: [true, "Please enter your ID number"]
    }
})

module.exports = User = mongoose.model('user', UserSchema);