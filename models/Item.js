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
    }
})

module.exports = Item = mongoose.model('item', ItemSchema);