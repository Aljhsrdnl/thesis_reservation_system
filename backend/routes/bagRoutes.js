const {Router} = require('express')
const router = Router();
const bagController = require('../controllers/bagController');


router.get('/bag/:id', bagController.get_bag_items)
router.post('/bag/:id', bagController.add_bag_item)
router.delete('/bag.:userID/:itemID', bagController.delete_item)

module.exports = router;