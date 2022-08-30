const Reservation = require("../models/Reservation")
const Item = require("../models/Item")

const reservationController = {
    add_request : async(req, res) => {
        const {user, borrowDate, returnDate, itemID, quantity_to_borrow, name, user_type} = req.body;
       
        const newReservationRequest = Reservation.create({
            user: user,
            borrowDate: borrowDate,
            returnDate: returnDate,
            itemID: itemID,
            itemName: name,
            quantity_to_borrow: quantity_to_borrow,
            user_type: user_type,
        });
            

        return res.status(201).send(newReservationRequest)
    },
    get_reservation: async (req, res) => {
        const reservations = await Reservation.find({}).populate('user')
        
        res.send(reservations);
    },
    delete_reservation:  async (req, res) => {
        const reservation = await Reservation.findOne({ _id: req.params.id });
        if (reservation) {
          const deletedReservationvation = await reservation.remove();
          res.send(deletedReservationvation);
        } else {
          res.status(404).send("Reservationvation Not Found.")
        }
      },
    get_user_reservation_by_id : async (req, res) => {
        const { userid } = req.params;
        Reservation.find({ user: userid})
            .then(reservations => res.json(reservations))
            .catch(err => console.error(err))
    },
    get_all_approved: async (req, res) => {
       Reservation.updateMany({ status: 'Approved' },
       { $set: {status: 'Pending'} })
        .then(data => res.json(data))
        
    },
    get_latest_reservation: async (req, res) => {
        Reservation.find().sort({ "createdAt": -1}).limit(1)
            .then(data => res.json(data))
    },
    get_all_pending : async (req, res) => {
        
        Reservation.find({status: 'Pending'})
            .then(pending => {
                res.json(pending)
                pending_req = pending

                //    ------------------------------------------
                // //---------------------------------->> ALGORITHM
                //find all unique itemName in the pending_req arr
                let unique_itemName = [];
                let start = false;
                let count = 0;
                for(j=0; j< pending_req.length; j++) {
                    for(i=0; i<unique_itemName.length; i++) {
                        if(pending_req[j].itemName == unique_itemName[i]) {
                            start = true;
                        }
                    }
                    count++;
    
                    if(count == 1 && start == false) {
                        unique_itemName.push(pending_req[j].itemName)
                    }
                    start = false;
                    count = 0;
                }

                console.log(`Unique Item Names: ${unique_itemName}`)
                
                
                // // ----------------------->>  Making an object of pending requests containing an empty object for each unique item Names    
                let pending_obj = {};
                
                
                for (r =0; r < unique_itemName.length; r++) {
                    let name = unique_itemName[r];
                    pending_obj[name] = [];
                }


                
                // --------------------> Retrieving Item data from database
                // putting unique item names to an array as query in finding the item data that are requested
                const pending_arr = Object.keys(pending_obj);
                
                Item.find({ name: pending_arr})
                    .then(data => {
                        let requested_items_data = data;

                        // ------------------------------------------->> Putting requests into designated requested itemName
                        for (let key in pending_obj) {
                            for (i=0; i<pending_req.length; i++) {
                                if (key == pending_req[i].itemName) {
                                    pending_obj[key].push(pending_req[i])
                                }
                            }
                        }
        
                        // for (let key in pending_obj) {
                        //     console.log(`--------------------------- \n ${key}: \n ${pending_obj[key]}`);
                        // }

                        // sort requests based on user_type where higher priority is given to WVSU Teachers
                        for (let key in pending_obj) {
                            let requested_item_name = pending_obj[key];
                                requested_item_name.sort( ( a,b ) => {
                                    return a.user_type.localeCompare(b.user_type);
                                })
                        }

                        //sort the time for users with user_type Teacher
                        for  (let key in pending_obj) {
                            let requested_item_name = pending_obj[key];
                            requested_item_name.sort( ( a,b ) => {
                                if(a.user_type == "Teacher" && b.user_type == "Teacher") {
                                    return a.returnDate - b.returnDate;
                                }
                            })
                        }
                        //sort the time for users with user_type WVSU Student
                        for  (let key in pending_obj) {
                            let requested_item_name = pending_obj[key];
                            requested_item_name.sort( ( a,b ) => {
                                if(a.user_type == "WVSU Student" && b.user_type == "WVSU Student") {
                                    return a.returnDate - b.returnDate;
                                }
                            })
                        }

                        for (let key in pending_obj) {
                            console.log(`--------------------------- \n ${key}: \n ${pending_obj[key]}`);
                        }
                        // --------------------------------------------->> sort time
                        
                        // for(let key in pending_obj) {
                        //     let key_value = pending_obj[key];
                        //     key_value.sort( (a,b) => {
                        //         return a.returnDate - b.returnDate; //if the return date of b is less than a, [b,a]
                        //     })
                        // }

                               
                        
                        // // ------------------------------------>> Algorithm
                        for (i = 0; i < requested_items_data.length; i++) {
                            let resources = requested_items_data[i].resources;
                            let item_name = requested_items_data[i].name;
                            let current_pending_requests = pending_obj[item_name];
                            let new_res = [];
                            
                            
                            resources.forEach(resource => {
                                // console.log(resource)
                                current_pending_requests.forEach(job => {
                                    if(resource.end_time <= job.borrowDate) {
                                        resource.end_time = job.returnDate;
                                        job.status = "Approved"
                                        resource.reserve.push(job);
                                        delete current_pending_requests[current_pending_requests.indexOf(job)];
                                        
                                        // update DB
                                        Reservation.updateOne({_id: job._id}, {$set: {status:job.status}})
                                            .then(console.log('success'))
                                    }
                                    
                                    try {

                                        Reservation.updateOne({_id: job._id}, {$set: {status:job.status}})
                                            .then(console.log('success'))
                                    }
                                    catch (e) {
                                        console.log(e)
                                    }
                                  
                                })
                                
                                Reservation.updateOne(
                                    { _id: {$in: current_pending_requests} },
                                    { $set: {status: 'Rejected', remarks: "Insufficient available resources" }}
                                )
                                    // .then(console.log('REJECTED'))
                                    
                                new_res.push(resource)
                                console.log(resource)
                                })
                                
                                // find Item by item_name and update the resources array with new_res
                                Item.updateOne(
                                    { name: item_name },
                                    { $set: {resources: new_res}}
                                )
                                .then(console.log(`Item Updated!!`))
                                
                                Reservation.updateOne(
                                    { _id: {$in: current_pending_requests} },
                                    { $set: {status: 'Rejected', remarks: "Insufficient available resources" }}
                                )
                                .then(console.log('REJECTED'))
                            }

                    })

                

                
            })
            .catch(err => console.error(err))
    },
}

const algo = (key, requested_items_data, pending_obj) => {
    console.log(`---------------------------RUNNING-------------------------------`)
    for (let i =0; i <requested_items_data.length; i++) {
        
        if ( requested_items_data[i].name == key) {
            let resources = requested_items_data[i].resources;
            let curr_pending_req = pending_obj[key];
            let new_res = [];

            resources.forEach(resource => {
                // console.log(resource)
                curr_pending_req.forEach(job => {
                    if(resource.end_time <= job.borrowDate) {
                        resource.end_time = job.returnDate;
                        job.status = "Approved"
                        job.remarks = " "
                        resource.reserve.push(job);
                        delete curr_pending_req[curr_pending_req.indexOf(job)];
                        
                        // update DB
                        Reservation.updateOne({_id: job._id}, {$set: {status:job.status, remarks: job.remarks}})
                            .then(console.log('success'))
                    }
                    
                    
                    try {

                        Reservation.updateOne({_id: job._id}, {$set: {status:job.status, remarks: job.remarks}})
                            .then(console.log('success'))
                    }
                    catch (e) {
                        console.log(e)
                    }

                    console.log(`REJECCTED REQUESTS`)
                    console.log(curr_pending_req)
                    Reservation.updateOne(
                        { _id: {$in: curr_pending_req} },
                        { $set: {status: 'Rejected', remarks: "Insufficient available resources" }}
                    )
                    .then(console.log('REJECTED'))
                  
                })
                
                new_res.push(resource)
                // update to reject
               
            })
            // console.log(`----------------------------------NEW RESOURCE------------------------`)
            // console.log(new_res)
            //find Item by item_name and update the resources array with new_res
            Item.updateOne(
                { name: key },
                { $set: {resources: new_res}}
            )
            .then(console.log(`Item Updated!!`))
        }
    }
}

module.exports = reservationController; 