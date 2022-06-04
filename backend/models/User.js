const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    user_type: {
        type: String,
        default: "WVSU Student", //Outside Researcher, Teacher, Admin
    },
    identification_num: {
        type: String,
        required: [true, "Please enter your ID number"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)