const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    //we do not need to put an ID because MongoDB will automatically put an ID  
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    avail_quantity: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: String,
    },
    resources: {
        type: Object
    }

})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;