const reservation_controller = require("../controllers/reservationController");

const router = require("express").Router();

router.post("/request_reservation", reservation_controller.add_request);
router.get("/get_reservation", reservation_controller.get_reservation);
router.get(
  "/get_reservation/:userid",
  reservation_controller.get_user_reservation_by_id
);
router.get("/get_pending", reservation_controller.get_all_pending);
router.get("/get_all_approved", reservation_controller.get_all_approved);
router.get("/get_all_reject", reservation_controller.get_all_reject);
router.get(
  "/get_latest_reservation",
  reservation_controller.get_latest_reservation
);
// router.put("/update_pending", reservation_controller.update_pending);
router.delete(
  "/get_reservation/:id",
  reservation_controller.delete_reservation
);

module.exports = router;
