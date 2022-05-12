const mongoose = require('mongoose');
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
    // if user / admin for user role management
    user_type: {
        type: String,
        default: "user"
    },
    identification_num: {
        type: String,
        required: [true, "Please enter your ID number"]
    }
})

module.exports = User = mongoose.model('user', UserSchema);