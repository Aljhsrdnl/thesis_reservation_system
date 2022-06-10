
const reservation_controller = require("../controllers/reservationController");

const router = require('express').Router();

router.post('/request_reservation', reservation_controller.add_request)


module.exports = router;