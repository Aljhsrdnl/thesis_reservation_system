require('dotenv').config();
const mongoose = require('mongoose');

const connnectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        })
        console.log('Succesfully connected to Database')
    }
    catch (err) {
        console.error(`Failed to Connect to Database ${err}`)
    }
}

module.exports = connnectDB;