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
  get_all_reject: async (req, res) => {
    Reservation.updateMany(
      { status: "Rejected" },
      { $set: { status: "Pending", remarks: " " } }
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

        // Create multiple instances of the Reservation with more than 1 quantity to borrow
        pending_req.forEach((pending) => {
          let quantity = pending.quantity_to_borrow;
          if (quantity > 1) {
            for (let i = 1; i < quantity; i++) {
              pending_req.push(pending);
            }
          }
        });

        console.log(pending_req);
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

        // console.log(`Unique Item Names: ${unique_itemName}`);

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
                a.user_type == "Admin" && //CHANGE THIS TO WVSU_Student
                b.user_type == "Admin"
              ) {
                return a.returnDate - b.returnDate;
              }
            });
          }

          let new_res = [];
          // New Algo
          for (i = 0; i < requested_items_data.length; i++) {
            // console.log(
            //   `REQUEST ITEMS LENGTH: ${requested_items_data[i].resources.length}`
            // );
            let resources = requested_items_data[i].resources;
            let item_name = requested_items_data[i].name;
            let current_pending_requests = pending_obj[item_name];
            // let new_res = [];

            resources.forEach((resource) => {
              for (a = 0; a < current_pending_requests.length; a++) {
                let current_resource = create(
                  resource,
                  current_pending_requests[a]
                );
                if (current_resource != "conflict") {
                  resource = current_resource;
                  current_pending_requests = del_element(
                    current_pending_requests,
                    current_pending_requests[a]
                  );
                  a = -1;
                } else {
                }
              }
              new_res.push(resource);
              // console.log(`Final New Resource: \n ${JSON.stringify(new_res)}`);
            });

            Item.updateOne(
              { name: item_name },
              { $set: { resources: new_res } }
            ).then(console.log("Successfully updated"));

            console.log(`NEW RESERVATION${new_res}`);
            update(new_res).then((msg) => {
              console.log(msg);
              console.log(`REJECTED REQUESTS: ${current_pending_requests}`);
              reject_element(current_pending_requests);
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
  // console.log(`\n RESOURCE: \n ${JSON.stringify(resource)}`);
  const insert = (reservationToBeInserted) => {
    // const reservation = new Reservation(reservationToBeInserted);
    // console.log(resource);
    if (resource.head == null) {
      resource.head = reservationToBeInserted;
      resource.length++;
      return resource;
    } else if (resource.head != null) {
      var currentNode = resource.head;

      while (currentNode) {
        if (
          reservationToBeInserted.data.borrowDate >=
            currentNode.data.returnDate &&
          currentNode.next == null
        ) {
          // let id = reservationToBeInserted.data._id;
          // console.log(id);
          // Reservation.updateOne(
          //   { _id: id },
          //   { $set: { status: "Approved" } }
          // ).then(console.log("Reservation Updated"));
          currentNode.next = reservationToBeInserted;
          resource.length++;
          return resource;
        } else if (
          reservationToBeInserted.data.returnDate <=
          resource.head.data.borrowDate
        ) {
          // let id = reservationToBeInserted.data._id;
          // console.log(id);
          // Reservation.updateOne(
          //   { _id: id },
          //   { $set: { status: "Approved" } }
          // ).then(console.log("Reservation Updated"));
          reservationToBeInserted.next = resource.head;
          resource.head = reservationToBeInserted;
          resource.length++;
          return resource;
        } else if (
          reservationToBeInserted.data.borrowDate >=
            currentNode.data.returnDate &&
          reservationToBeInserted.data.returnDate <=
            currentNode.next.data.borrowDate &&
          currentNode.next != null
        ) {
          // let id = reservationToBeInserted.data._id;
          // console.log(id);
          // Reservation.updateOne(
          //   { _id: id },
          //   { $set: { status: "Approved" } }
          // ).then(console.log("Reservation Updated"));
          reservationToBeInserted.next = currentNode.next;
          currentNode.next = reservationToBeInserted;
          resource.length++;
          return resource;
        } else if (currentNode.next == null) {
          return "conflict";
        }

        currentNode = currentNode.next;
      }
    }
  };
  // console.log(`FINAL LIST: ${JSON.stringify(insert(reservationToBeInserted))}`);
  const return_val = insert(reservationToBeInserted);
  return return_val;
};

const del_element = (arr, element) => {
  let i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i]._id === element._id) {
      break;
    }
  }
  arr.splice(i, 1);

  return arr;
};

const update = (new_res) => {
  return new Promise((resolve, reject) => {
    // const approve_element = (new_res) => {
    new_res.forEach((resource) => {
      currentNode = resource.head;
      while (currentNode) {
        let id = currentNode.data._id;
        Reservation.updateOne(
          { _id: id },
          { $set: { status: "Approved" } }
        ).then(
          console.log(
            `Successfully updated status! of Reservation with ID: ${id}`
          )
        );
        currentNode = currentNode.next;
      }
    });
    resolve("DONE ALL APPROVED");
    // };
  });
};

const reject_element = (current_pending_requests) => {
  current_pending_requests.forEach((pending) => {
    let id = pending._id;
    Reservation.updateOne(
      { _id: id },
      {
        $set: {
          status: "Rejected",
          remarks: "Insufficient available resources.",
        },
      }
    ).then(
      console.log(`Successfully updated status to REJECTED AND REMARKSE ${id}`)
    );
  });
};
module.exports = reservationController;
