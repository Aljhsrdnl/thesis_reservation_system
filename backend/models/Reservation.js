const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema ({
    user: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    borrowDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    //Values for status: Pending, Rejected, Approved, Active (on-use), Returned
    status:{
        type: String,
        default: "Pending"
    },
    remarks: {
        type: String,
        default: " "
    },
    itemID: {
        type:mongoose.Types.ObjectId,
        ref: 'Item'
    },
    itemName: {
        type: String
    },
    quantity_to_borrow: {
        type: Number,
        required: true
    },
    user_type: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;