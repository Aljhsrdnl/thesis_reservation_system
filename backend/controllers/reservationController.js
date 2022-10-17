const Reservation = require("../models/Reservation");
const Item = require("../models/Item");
const LinkedList = require("./LinkedList");
const ReservationNode = require("./ReservationNode");

const reservationController = {
  add_request: async (req, res) => {
    const {
      user,
      borrowDate,
      returnDate,
      itemID,
      quantity_to_borrow,
      name,
      user_type,
    } = req.body;

    const newReservationRequest = Reservation.create({
      user: user,
      borrowDate: borrowDate,
      returnDate: returnDate,
      itemID: itemID,
      itemName: name,
      quantity_to_borrow: quantity_to_borrow,
      user_type: user_type,
    });

    return res.status(201).send(newReservationRequest);
  },
  get_reservation: async (req, res) => {
    const reservations = await Reservation.find({}).populate("user");

    res.send(reservations);
  },
  delete_reservation: async (req, res) => {
    const reservation = await Reservation.findOne({ _id: req.params.id });
    if (reservation) {
      const deletedReservationvation = await reservation.remove();
      res.send(deletedReservationvation);
    } else {
      res.status(404).send("Reservationvation Not Found.");
    }
  },
  get_user_reservation_by_id: async (req, res) => {
    const { userid } = req.params;
    Reservation.find({ user: userid })
      .then((reservations) => res.json(reservations))
      .catch((err) => console.error(err));
  },
  get_all_approved: async (req, res) => {
    Reservation.updateMany(
      { status: "Approved" },
      { $set: { status: "Pending" } }
    ).then((data) => res.json(data));
  },
  get_latest_reservation: async (req, res) => {
    Reservation.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((data) => res.json(data));
  },
  get_all_pending: async (req, res) => {
    Reservation.find({ status: "Pending" })
      .then((pending) => {
        res.json(pending);
        pending_req = pending;

        //    ------------------------------------------
        // //---------------------------------->> ALGORITHM
        //find all unique itemName in the pending_req arr
        let unique_itemName = [];
        let start = false;
        let count = 0;
        for (j = 0; j < pending_req.length; j++) {
          for (i = 0; i < unique_itemName.length; i++) {
            if (pending_req[j].itemName == unique_itemName[i]) {
              start = true;
            }
          }
          count++;

          if (count == 1 && start == false) {
            unique_itemName.push(pending_req[j].itemName);
          }
          start = false;
          count = 0;
        }

        console.log(`Unique Item Names: ${unique_itemName}`);

        // // ----------------------->>  Making an object of pending requests containing an empty object for each unique item Names
        let pending_obj = {};

        for (r = 0; r < unique_itemName.length; r++) {
          let name = unique_itemName[r];
          pending_obj[name] = [];
        }

        // --------------------> Retrieving Item data from database
        // putting unique item names to an array as query in finding the item data that are requested
        const pending_arr = Object.keys(pending_obj);

        Item.find({ name: pending_arr }).then((data) => {
          let requested_items_data = data;

          // ------------------------------------------->> Putting requests into designated requested itemName
          for (let key in pending_obj) {
            for (i = 0; i < pending_req.length; i++) {
              if (key == pending_req[i].itemName) {
                pending_obj[key].push(pending_req[i]);
              }
            }
          }

          // for (let key in pending_obj) {
          //     console.log(`--------------------------- \n ${key}: \n ${pending_obj[key]}`);
          // }

          // sort requests based on user_type where higher priority is given to WVSU Teachers
          for (let key in pending_obj) {
            let requested_item_name = pending_obj[key];
            requested_item_name.sort((a, b) => {
              return a.user_type.localeCompare(b.user_type);
            });
          }

          //sort the time for users with user_type Teacher
          for (let key in pending_obj) {
            let requested_item_name = pending_obj[key];
            requested_item_name.sort((a, b) => {
              if (a.user_type == "Teacher" && b.user_type == "Teacher") {
                return a.returnDate - b.returnDate;
              }
            });
          }
          //sort the time for users with user_type WVSU Student
          for (let key in pending_obj) {
            let requested_item_name = pending_obj[key];
            requested_item_name.sort((a, b) => {
              if (
                a.user_type == "WVSU Student" &&
                b.user_type == "WVSU Student"
              ) {
                return a.returnDate - b.returnDate;
              }
            });
          }

          for (let key in pending_obj) {
            console.log(
              `--------------------------- \n ${key}: \n ${pending_obj[key]}`
            );
          }

          // New Algo
          for (i = 0; i < requested_items_data.length; i++) {
            console.log(
              `REQUEST ITEMS LENGTH: ${requested_items_data[i].resources.length}`
            );
            let resources = requested_items_data[i].resources;
            let item_name = requested_items_data[i].name;
            let current_pending_requests = pending_obj[item_name];
            let new_res = [];
            // console.log(`-------------RESOURCES--------------------`)
            // console.log(requested_items_data.length)
            // console.log(item_name)
            // console.log(resources)

            resources.forEach((resource) => {
              //loop through the available resource for each unique item_name
              console.log(`RESOURCE: ${JSON.stringify(resource)}`);
              current_pending_requests.forEach((request) => {
                //loop through all requests to specific item
                let current_resource = create(resource.reserve, request);
                // let stringified_current_resource = JSON.stringify(current_resource)
                console.log(
                  `Current Resource: ${JSON.stringify(current_resource)}`
                );
                if (current_resource != null) {
                  //current_resource will only be null if it does not satisfy the conditions on the addside function (see line 171-179)
                  resource.reserve = current_resource;
                  new_res.push(resource);
                  //delete the `request` from the current_pending_requests array
                  const new_arr_length = deleteElement(
                    current_pending_requests,
                    current_pending_requests.length,
                    request
                  );
                }
              });
              console.log(`New Resource: ${JSON.stringify(new_res)}`);
              // Item.updateOne(
              //     { name: item_name },
              //     { $set: {resources: new_res}}
              // )
              // .then(console.log('Successfully updated'))
            });
          }
        });
      })
      .catch((err) => console.error(err));
  },
};

const create = (resource, request) => {
  //request is an object containing all details reagarding the reservation request
  const reservationToBeInserted = new ReservationNode(request);
  console.log(`working create`);

  const insert = (reservationToBeInserted) => {
    // const reservation = new Reservation(reservationToBeInserted);
    const head = this.head;
    console.log(`working insert`);
    if (resource.head == null) {
      resource.head = reservationToBeInserted;
      resource.length++;
      console.log(`inserted at the head`);
      console.log(`Resource Head: ${JSON.stringify(resource.head)}`);
      return resource;
    } else if (resource.head != null) {
      var currentNode = resource.head;

      // for(i=1; i<=resource.length;i++) { //currentNode is NOT NULL
      while (currentNode) {
        if (resource.length == 1) {
          // case 1: linkedList's length is 1 and newReservation is less than the head
          if (
            reservationToBeInserted.data.returnDate <=
            currentNode.data.borrowDate
          ) {
            const temp = currentNode;
            resource.head = reservationToBeInserted;
            resource.head.next = temp;
            console.log(reservationToBeInserted.data.returnDate);
            console.log(currentNode.data.borrowDate);
            console.log(
              reservationToBeInserted.data.returnDate <=
                currentNode.data.borrowDate
            );
            console.log(`Resource: ${JSON.stringify(resource.head.data)}`);
            console.log(
              `---------------------------1123124----------------------`
            );
            resource.length++;
            return resource;
            // case 1.1: linkedList's length is 1 and newReservation is greater than the head
            // put the newReservation to the end of the head
          } else if (
            reservationToBeInserted.data.borrowDate >=
            currentNode.data.returnDate
          ) {
            currentNode.next = reservationToBeInserted;
            console.log(reservationToBeInserted.data.returnDate);
            console.log(currentNode.data.borrowDate);
            console.log(`Resource: ${JSON.stringify(resource)}`);
            resource.length++;
            console.log(`less than 2`);
            console.log(
              `-----------------1312--------------------------------`
            );
            return resource;
          }
        }
        // case 2: linklist's length is more than 1
        else if (resource.length > 1) {
          // case 5: if reservation is less than the head, and the linklist's len is kroe than 1
          if (
            reservationToBeInserted.data.returnDate <=
            currentNode.data.borrowDate
          ) {
            const temp = currentNode;
            resource.head = reservationToBeInserted;
            resource.head.next = temp;
            resource.length++;
            console.log(`Resource: ${JSON.stringify(resource)}`);
            console.log(`less than`);
            console.log(`--------------------123-----------------------------`);
            return resource;
          }
          // if in between kag GREATER THAN currentNode
          else if (currentNode.next != null) {
            if (
              reservationToBeInserted.data.returnDate <=
                currentNode.next.data.borrowDate &&
              reservationToBeInserted.data.borrowDate >=
                currentNode.data.returnDate
            ) {
              var temp = currentNode.next;
              reservationToBeInserted.next = temp;
              currentNode.next = reservationToBeInserted;
              console.log(`inbetween`);
              resource.length++;
              return resource;
            }
          }
          // case 4: reservation should be inserted at the end of the linkedlist
          else if (
            currentNode.next == null &&
            currentNode.data.returnDate <=
              reservationToBeInserted.data.borrowDate
          ) {
            currentNode.next = reservationToBeInserted;
            console.log(
              `reservation should be inserted at the end of the linkedlist`
            );
            console.log(`CURRENTNODE: ${JSON.stringify(currentNode)}`);
            resource.length++;
            return resource;
          } else {
            console.log(
              "---------------------------------------------conflict-----------------------------------------------"
            );
            return null;
          }
        }
        currentNode = currentNode.next;
        console.log(`CURRENTNODE: ${JSON.stringify(currentNode)}`);
      }
    }
  };
  // console.log(`FINAL LIST: ${JSON.stringify(insert(reservationToBeInserted))}`);
  const return_val = insert(reservationToBeInserted);
  console.log(`RETURN VALUE: ${JSON.stringify(return_val)}`);
  return return_val;
};

const deleteElement = (arr, arrLength, element) => {
  let i;
  for (i = 0; i < arrLength; i++) {
    if (arr[i]._id == element._id) {
      break;
    }
  }

  if (i < arrLength) {
    arrLength = arrLength - 1;
    for (let j = i; j < arrLength; j++) {
      arr[j] = arr[j + 1];
    }
  }

  return arrLength;
};

module.exports = reservationController;
