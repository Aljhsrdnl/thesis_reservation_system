const Reservation = require("../models/Reservation")
const Item = require("../models/Item")

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
                
                
                // ----------------------->>  Assigning items     
                let pending_obj = {};
                
                
                for (r =0; r < unique_values.length; r++) {
                    let name = unique_values[r];
                    pending_obj[name] = [];
                }
                
                // --------------------> Retrieving Item data
                const pending_arr = Object.keys(pending_obj);
                
                Item.find({ name: pending_arr})
                    .then(data => {
                        let requested_items_data = data;

                        // ------------------------------------------->> Inserting items to pending_obj
                        for (let key in pending_obj) {
                            for (i=0; i<pending_req.length; i++) {
                            if (key == pending_req[i].itemName) {
                                pending_obj[key].push(pending_req[i])
                            }
                            }
                        }
        
                        // --------------------------------------------->> sort time
                        
                        for(let key in pending_obj) {
                            let key_value = pending_obj[key];
                            key_value.sort( (a,b) => {
                                return a.returnDate - b.returnDate;
                            })
                        }

                        //---------------------------------->> create an object for resources
                        let resources_obj = {};
                        for(i = 0; i < requested_items_data.length; i++) {
                            let name = requested_items_data[i].name;
                            resources_obj[name] = [];
                            for (j = 0; j < requested_items_data[i].avail_quantity; j++) {
                                let r_obj = {
                                    end_time: -1,
                                    reserve: []
                                }
                                resources_obj[name].push(r_obj)
                            }
                        }

                        console.log(resources_obj)
                    })

                

                
            })
            .catch(err => console.error(err))
    }
}

module.exports = reservationController;