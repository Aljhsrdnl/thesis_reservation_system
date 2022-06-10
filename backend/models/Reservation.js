const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema ({
    user: {
        type:mongoose.Types.ObjectId,
        ref: 'users'
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
        type: String,
        required: true
    },
    quantity_to_borrow: {
        type: Number,
        required: true
    }

})

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;