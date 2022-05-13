const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const BagSchema = new Schema ({
    user_ID: { //needed to identify which users owns the bag
        type: stringify
    },
    items_in_bag: {
        item_ID: { 
            type: String
        },
        name: String,
        quantity : {
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1'],
            default: 1
        }
    }
})

module.exports = Bag = mongoose.model('bag', BagSchema);