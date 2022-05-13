const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema ({
    user_ID: {
        type: String
    },
    items_in_reservation: [
        {
            item_ID: { type: String },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity cannot be less than 1.']
            }
        }
    ],
    date_made: {
        type: Date,
        default: Date.now
    }

})