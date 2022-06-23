const Reservation = require("../models/Reservation")

const reservationController = {
    add_request : async(req, res) => {
        const {user, borrowDate, returnDate, itemID, quantity_to_borrow, name} = req.body;
       
        const newReservationRequest = Reservation.create({
            user: user,
            borrowDate: borrowDate,
            returnDate: returnDate,
            itemID: itemID,
            itemName: name,
            quantity_to_borrow: quantity_to_borrow});
            

        return res.status(201).send(newReservationRequest)
    },
    get_user_reservation : async (req, res) => {
        const { userid } = req.params;
        Reservation.find({ user: userid})
            .then(reservations => res.json(reservations))
            .catch(err => console.error(err))
    },
    get_all_pending : async (req, res) => {
        
        Reservation.find({status: 'Pending'})
            .then(pending => {
                res.json(pending)
                pending_req = pending
                //---------------------------------->> ALGORITHM
                //find all unique itemName in the pending_req arr
                let unique_values = [];
                let start = false;
                let count = 0;
                for(j=0; j< pending_req.length; j++) {
                    for(i=0; i<unique_values.length; i++) {
                        if(pending_req[j].itemName == unique_values[i]) {
                            start = true;
                        }
                    }
                    count++;
    
                    if(count == 1 && start == false) {
                        unique_values.push(pending_req[j].itemName)
                    }
                    start = false;
                    count = 0;
                }
                console.log(unique_values);

            })
            .catch(err => console.error(err))
    }
}

module.exports = reservationController;