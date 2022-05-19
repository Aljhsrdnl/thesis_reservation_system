const {Router} = require('express')
const router = Rputer();
const bagController = require('../controllers/bagController');


router.get('/bag/:id', bagController.)
router.post('/bag/:id', bagController.)
router.delete('/bag.:userID/:itemID', bagController.)

module.exports = router;