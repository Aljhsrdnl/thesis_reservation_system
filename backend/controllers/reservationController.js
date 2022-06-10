const Reservation = require("../models/Reservation")

const reservationController = {
    add_request : async(req, res) => {
        const {user, borrowDate, returnDate, itemID, quantity_to_borrow} = req.body;
        
        // const reservation_details =  {
        //     user: user,
        //     borrow_date: borrow_date,
        //     return_date: return_date,
        //     itemID: itemID,
        //     quantity_to_borrow: quantity_to_borrow
        // }


        const newReservationRequest = Reservation.create({
            user: user,
            borrowDate: borrowDate,
            returnDate: returnDate,
            itemID: itemID,
            quantity_to_borrow: quantity_to_borrow});

        return res.status(201).send(newReservationRequest)
    }
}

module.exports = reservationController;