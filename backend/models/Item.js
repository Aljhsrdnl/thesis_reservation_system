const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema ({
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
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    variant: { //for different sizes of item
        type: String,
        required: true,
    }
})

module.exports = Item = mongoose.model('item', ItemSchema);